import { normalize } from "normalizr";
import { AnyAction, Middleware } from "redux";
import { Resources, RESOURCE_TO_SCHEMAS } from "../../consts/schemas";
import { fetchFacade } from "../../utils/api";
import { EndpointError } from "../../utils/EndpointError";
import { logger } from "../../utils/logger";

export const API_CALL_ACTION_TYPE = "API_CALL";

export type ApiCallAction = {
  type: typeof API_CALL_ACTION_TYPE;
  payload: {
    url: string;
    options?: RequestInit;
    entity: string;
    schema?: Resources;
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
    const {
      url,
      options,
      entity,
      schema: schemaIdentification,
    } = safeAction.payload;
    const apiActions = getApiActions(entity);

    next({ type: apiActions.start });

    const schema = schemaIdentification
      ? RESOURCE_TO_SCHEMAS.get(schemaIdentification)
      : undefined;

    fetchFacade(url, options)
      .then((response) => {
        next({
          type: apiActions.success,
          payload: schema ? normalize(response, schema) : response,
        });
      })
      .catch((error) => {
        let safeError: EndpointError;

        if (error instanceof EndpointError) {
          safeError = error;
        } else {
          safeError = new EndpointError(
            error instanceof Error ? error.message : "Unknown error"
          );
        }

        logger.error(
          `Error caught on client - ${entity}: ${safeError.message}`
        );

        next({
          type: apiActions.failure,
          payload: safeError,
        });
      });
  };
