import Joi from 'joi';

function getJoiSchema(obj) {
  let joiSchema = null;

  switch (obj.validation_type) {
    case 'string': {
      joiSchema = Joi.string();
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      if (!obj.required) {
        joiSchema = joiSchema.allow('');
      }
      break;
    }

    case 'boolean': {
      joiSchema = Joi.boolean();
      if (
        (obj.required && obj.conditionKey !== true) ||
        obj.conditionKey !== false
      ) {
        joiSchema = joiSchema.required();
      }
      break;
    }

    case 'integer': {
      joiSchema = Joi.number();
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      if (!obj.required) {
        joiSchema = joiSchema.allow('');
      }
      if (obj.required && typeof obj.minValue !== 'undefined') {
        joiSchema = joiSchema.min(obj.minValue);
      }
      if (obj.required && typeof obj.maxValue !== 'undefined') {
        joiSchema = joiSchema.max(obj.maxValue);
      }
      break;
    }

    case '[string]':
      joiSchema = Joi.array().items(Joi.string());
      if (obj.required) {
        joiSchema = joiSchema.required();
      }
      break;

    case '[]': {
      joiSchema = Joi.array();
      if (obj.required) {
        joiSchema = joiSchema.required();
      }
      break;
    }

    case 'date': {
      joiSchema = Joi.date();
      if (obj.required) {
        joiSchema = joiSchema.required();
      }
      break;
    }

    case 'email': {
      joiSchema = Joi.string();
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.email().required();
      }
      if (!obj.required) {
        joiSchema = joiSchema.allow('');
      }
      break;
    }

    case 'ipdns': {
      joiSchema = Joi.alternatives().try(
        Joi.string().ip({
          version: ['ipv4', 'ipv6'],
          cidr: 'optional',
        }),
        Joi.string().regex(
          // eslint-disable-next-line no-useless-escape
          /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]+)$/
        )
      );
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      break;
    }

    case '[ipaddress]': {
      joiSchema = Joi.array()
        .min(1)
        .items([
          Joi.string().ip({
            version: ['ipv4'],
            cidr: 'optional',
          }),
          Joi.string().ip({
            version: ['ipv6'],
            cidr: 'optional',
          }),
        ]);
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      break;
    }
    case '[ipdns]': {
      joiSchema = Joi.array().items([
        Joi.string().ip({
          version: ['ipv4', 'ipv6'],
          cidr: 'optional',
        }),
        Joi.string().regex(
          // eslint-disable-next-line no-useless-escape
          /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]+)$/
        ),
      ]);
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      break;
    }
    case 'ip': {
      joiSchema = Joi.string().ip({
        version: ['ipv4', 'ipv6'],
        cidr: 'optional',
      });
      if (obj.required && !obj.conditionKey) {
        joiSchema = joiSchema.required();
      }
      break;
    }
    case 'password_confirmation': {
      joiSchema = Joi.any().valid(Joi.ref('password')).required();
      break;
    }
    case 'any': {
      joiSchema = Joi.any().optional();
      break;
    }
    default:
      joiSchema = Joi.string();
      break;
  }

  if (obj.conditionKey && !obj.ignoreConditionKeyValidation) {
    joiSchema = joiSchema.when(obj.conditionKey, {
      is: obj.condition,
      then: Joi.required(),
    });
  }
  return joiSchema;
}

const validate = (data, options) => {
  const miniSchema = {};

  options.schema.forEach((item) => {
    if (item.required || item.validate) {
      const joiSchema = getJoiSchema(item);
      miniSchema[item.name] = joiSchema;
    }
  });

  const Schema = Joi.object().keys({
    data: Joi.object().keys(miniSchema),
  });

  const result = Schema.validate(
    {data},
    {abortEarly: false, allowUnknown: true}
  );
  let errors = {};
  if (result.error) {
    result.error.details.forEach((details) => {
      let message = details.message.replace('"', '');
      if (!(options && options.untouchedErrorMessages)) {
        message = message.replace('"', '');
        message = message.replace('_', ' ');
        message = message.charAt(0).toUpperCase() + message.slice(1);
      }
      errors[details.context.key] = message;
    });
  } else {
    errors = {
      valid: true,
    };
  }
  return errors;
};

export default validate;
