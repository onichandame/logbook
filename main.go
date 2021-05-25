package main

import "github.com/onichandame/logbook/router"

func main() {
	r := router.Router()
	r.Run("0.0.0.0:3000")
}
