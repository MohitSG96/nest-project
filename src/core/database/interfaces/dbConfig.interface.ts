/**
 * Interface for database attributes
 */
export interface IDatabaseConfigAttributes {
  /**
   * DB username
   */
  username?: string;
  /**
   * DB password
   */
  password?: string;
  /**
   * DB name
   */
  database?: string;
  /**
   * DB host
   */
  host?: string;
  /**
   * DB url
   */
  port?: number | string;
  /**
   * DB Type (MySQL/PostgreSQL,MSSQL, etc)
   */
  dialect?: string;
  /**
   * DB URL string (if host, port, username, password not applicable)
   */
  urlDatabase?: string;
}

/**
 * Interface for database environment
 */
export interface IDatabaseConfig {
  /**
   * Dev DB attribute
   */
  development: IDatabaseConfigAttributes;
  /**
   * Test DB attribute
   */
  test: IDatabaseConfigAttributes;
  /**
   * Production DB attribute
   */
  production: IDatabaseConfigAttributes;
}
