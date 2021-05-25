package routes

import "time"
import "net/http"
import "github.com/gin-gonic/gin"

func Status(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "OK", "timestamp": time.Now().UnixNano()})
}
