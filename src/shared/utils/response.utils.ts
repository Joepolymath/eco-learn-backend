import { Response } from 'express';
import serverResponseStatus from '../constants/serverResponseStatus.constant';

export interface IResponse {
  status: string;
  statusCode: number;
  message: string;
  [key: string]: any;
}

class ResponseUtils {
  public buildResponse(response: {
    [key: string]: any;
    message: string;
  }): IResponse {
    return {
      ...response,
      message: response.message,
      status: serverResponseStatus.RESPONSE_STATUS_SUCCESS,
      statusCode: serverResponseStatus.OK,
    };
  }

  public buildFailedResponse(response: any) {
    return {
      ...response,
      status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
      statusCode: serverResponseStatus.FAILED,
    };
  }

  //   for server error
  public errorResponse(res: Response, message: string, data: any = null) {
    if (data == null) {
      return res.status(500).json({ status: 'failure', message });
    }

    return res.status(500).json({ message, status: 'failure', data });
  }

  //   when request isn't authorized

  public unauthorizedResponse(
    res: Response,
    message: string,
    data: any = null
  ) {
    if (data == null) {
      return res.status(401).json({ status: 'failure', message });
    }
    return res.status(401).json({ message, status: 'failure', data });
  }

  //   for bad requests
  public badRequestResponse(res: Response, message: string, data: any = null) {
    if (data == null) {
      return res.status(400).json({ status: 'failure', message });
    }
    return res.status(400).json({ message, status: 'failure', data });
  }
}

export default new ResponseUtils();
