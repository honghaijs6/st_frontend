

const server = {
  host: "http://localhost",//"http://localhost",//"http://115.78.5.75",
  port:4545,

  url:'',
  paginate:{
    p:0,
    offset:0,
    max:20,
    is_deleted:0,
    key:'',
    sort_by:'date_created',
    sort_type:'DESC'
  },

  base(){
    return this.host+':'+this.port
  },

  setHeader(){

    return  {
      headers:{
        "Content-Type": "application/json",
        "Authorization": this.token(),
        "cache-control": "no-cache"
      }
    }
  },
  token:function(){
    return localStorage.getItem('feathers-jwt');
  }



}

export default server;
