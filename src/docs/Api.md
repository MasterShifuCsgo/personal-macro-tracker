

every api returns a standardized result:


{error: string | null, result: Array | Object | null}
error codes are send as response status codes through received http messages. 
e.g. 401, 501 are sent by the server and processed by the browser. 

result: null - is only returned when no result was meant to be sent. 

