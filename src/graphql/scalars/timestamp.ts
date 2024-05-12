import { GraphQLScalarType, Kind } from 'graphql';
import * as moment from 'moment';

const TimestampScalar = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Custom scalar type for timestamp',
  serialize(value) {
    // Implement serialization logic here
    // Convert the value to a string or any other format you prefer
    console.log({ value });
    return moment(value).unix();
  },
  parseValue(value: string) {
    // Implement parse value logic here
    // Convert the value from a string or any other format to the desired type
    return new Date(value);
  },
  parseLiteral(ast) {
    console.log({ ast });
    // Implement parse literal logic here
    // Convert the AST value to the desired type
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default TimestampScalar;
