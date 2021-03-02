export const success = (req:any, res:any, message:any, datos:any, status:number) => {
  const response = {
    details: message,
    body: datos,
  };
  if (!message) {
    delete response.details;
  }

  res.status(status || 200).send(response);
};

export const error = function (req:any, res:any, message:any, status:number, details:string) {
  console.error('[response error] ' + details);

  res.status(status || 500).send({ 
      error: message,
      body: '',
  });
}