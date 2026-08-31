export interface UiMeta {
  displayName?: string;
  icon?: string;
  renderer?: string;
  order?: number;
  /** Reference-only info (e.g. character stats/equipment) — not needed to
   *  follow the route, but useful when troubleshooting a desync. Hidden by
   *  default in HTML output behind a page-level toggle. */
  reference?: boolean;
}

export interface PropertySchema {
  type: 'integer' | 'number' | 'string' | 'boolean' | 'array' | 'object';
  enum?: (string | number)[];
  minimum?: number;
  maximum?: number;
  items?: PropertySchema;
  properties?: Record<string, PropertySchema>;
  'x-ui'?: UiMeta;
}

export interface ComponentSchema {
  $id?: string;
  title: string;
  type: 'object';
  properties: Record<string, PropertySchema>;
  additionalProperties?: boolean;
  'x-ui'?: UiMeta;
}

export interface GameSchema {
  id: string;
  title: string;
  components: Record<string, ComponentSchema>;
  componentOrder?: string[];
}
