/**
 * 类型转译的Map
 */
var typeMap = {
  String: "string",
  string: "string",
  Long: "number",
  long: "number",
  Integer: "number",
  Double: "number",
  Float: "number",
  BigDecimal: "number",
  Date: "Date",
  LocalDateTime: "Date",
  LocalDate: "Date",
  LocalTime: "Date",
  Boolean: "boolean",
  List: "Array",
  Map: "object",
  Object: "object"
};
module.exports = typeMap;
