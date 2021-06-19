import { TestModule, createRandomStr } from "./base.test-util";
import { User } from "./user";
import { LocalCredential } from "./credential";

describe(__filename, () => {
  let testMod: TestModule;
  let user: User;
  beforeAll(async () => {
    testMod = await TestModule.create({ entities: [User, LocalCredential] });
    user = await testMod.em.save(
      testMod.em.create(User, { name: createRandomStr() })
    );
    expect(user);
  });
  afterAll(() => TestModule.close(testMod));

  it(`local cred can deal with password`, async () => {
    const em = testMod?.em;
    let password = createRandomStr();
    let doc = await em.save(em.create(LocalCredential, { user, password }));
    const test = () => {
      // do not store plain text
      expect(doc.password).not.toEqual(password);
      // can authenticate
      expect(doc.validatePass(password)).resolves.toBeTruthy();
      expect(doc.validatePass(createRandomStr())).resolves.toBeFalsy();
    };
    test();
    password = createRandomStr();
    doc.password = password;
    doc = await em.save(doc);
    test();
  });
});
