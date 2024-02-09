import { AnyAction, Middleware } from "redux";
import { ErrorMessage } from "../../types/error";
import { fetchFacade } from "../../utils/api";
import { logger } from "../../utils/logger";

export const API_CALL_ACTION_TYPE = "API_CALL";

export type ApiCallAction = {
  type: typeof API_CALL_ACTION_TYPE;
  payload: {
    url: string;
    options?: RequestInit;
    entity: string;
  };
};

export const getApiActions = <Entity extends string>(entity: Entity) => {
  return {
    start: `${API_CALL_ACTION_TYPE}_START_${entity}`,
    success: `${API_CALL_ACTION_TYPE}_SUCCESS_${entity}`,
    failure: `${API_CALL_ACTION_TYPE}_FAILURE_${entity}`,
  };
};

export const apiMiddleware: Middleware =
  () => (next) => (action: AnyAction) => {
    logger.info(`${action.type} - API MIDDLEWARE`);

    if (action.type !== API_CALL_ACTION_TYPE) {
      return next(action);
    }

    const safeAction = action as ApiCallAction;
    const { url, options, entity } = safeAction.payload;
    const apiActions = getApiActions(entity);

    next({ type: apiActions.start });

    fetchFacade(url, options)
      .then((response) => {
        next({ type: apiActions.success, payload: response });
      })
      .catch((error) => {
        const errorMessage: ErrorMessage = {
          message: error instanceof Error ? error.message : "Unknown error",
        };

        logger.error(
          `Error caught on client - ${entity}: ${errorMessage.message}`
        );

        next({
          type: apiActions.failure,
          payload: errorMessage,
        });
      });
  };
