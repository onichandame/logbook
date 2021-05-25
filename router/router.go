package router

import "github.com/gin-gonic/gin"
import "github.com/onichandame/logbook/controllers"

func Router() *gin.Engine {
	r := gin.Default()
	r.GET("/status", routes.Status)
	return r
}
