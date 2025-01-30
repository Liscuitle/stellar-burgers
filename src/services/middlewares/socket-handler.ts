import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

export type TWsAction = {
  wsError: ActionCreatorWithPayload<any>;
  wsRequest: ActionCreatorWithPayload<any>;
  wsStart: ActionCreatorWithPayload<string>;
  wsEnd: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
};

export const wsMiddleware = (wsActions: TWsAction): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsStart, wsEnd, wsOpen, wsClose, wsError, wsRequest } = wsActions;

      if (wsStart.match(action)) {
        socket = new WebSocket(action.payload);

        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError("WebSocket encountered an error"));
        };

        socket.onmessage = (event) => {
          try {
            const parsedData = JSON.parse(event.data);

            if (!parsedData.success) {
              dispatch(
                wsError(`WebSocket message error: ${parsedData.message}`)
              );
            } else {
              dispatch(wsRequest(parsedData));
            }
          } catch {
            dispatch(wsError("Error parsing message"));
          }
        };

        socket.onclose = () => {
          dispatch(wsClose());
        };
      }

      if (wsEnd.match(action)) {
        if (socket) {
          socket.close();
          socket = null;
        }
        dispatch(wsClose());
      }

      next(action);
    };
  }) as Middleware;
};
