class apierror extends Error{
    constructor(
        statuscode,
        errors=[],
        statck="",
        message="something went wrong"
    ){
        super(message)
        this.statuscode= statuscode
        this.data= null
        this.message= message
        this.success= false
        this.errors= errors

        if(statck){
            this.stack= statck
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export {apierror}