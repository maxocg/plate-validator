
const env = require('../../config/environment');
export const GET = 'GET';
export const POST = 'POST';
const base64 = require('base-64');

const makeApi = (apiOptions) => {
  const {
    baseURI    
  } = apiOptions;
  var requesHeaders = new Headers();
  return async (requestOptions) => {
    const { username, password } = requestOptions;
    requesHeaders.append("Authorization", "Basic " + base64.encode(username+':'+password));
    let request = ''
    console.log(username);
    console.log(password);
    let jsonBody = '';
    if(requestOptions.method == POST){
      const { body } = requestOptions;
      console.log(body, typeof body);
      jsonBody = (typeof body === 'object') ? JSON.stringify(body): body;
      console.log(jsonBody);
      request = new Request(baseURI +requestOptions.url, {
        ...requestOptions,
        headers: requesHeaders,
        body:jsonBody
      });
    } else{
      request = new Request(baseURI +requestOptions.url, {
        ...requestOptions,
        headers: requesHeaders
  
      });
    }
    console.log(request)
    const response = await fetch(request);
    console.log(response)
    if (response.err) throw response.err;
    if(response.status == 200 ) {
      const res = await response.json();
      console.log(res)
      return res
    }else if (response.status == 401){
      throw new Error("Usuário ou senha inválidos");
    }
    else {
      throw new Error("Ocorreu uma falha na comunicação. Aguarde um pouco e tente novamente");
    }
  }
};

export const api = makeApi({
  baseURI: env.endpoint.api
});
export const login = ({username,password}) => api({
  url:'/auth',
  method: GET,
  username:username,
  password:password
})
export const validatePlate = ({username,password,plate}) => api({
  url:'/pvl/validate?plate='+plate,
  method: GET,
  username:username,
  password:password
})
export const reportPlate = ({username,password,plate}) => api({
  url:'/pvl/report',
  method: POST,
  username:username,
  password:password,
  body:{
    plate:plate
  }
})