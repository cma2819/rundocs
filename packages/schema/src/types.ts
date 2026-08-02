export interface UiMeta {
  displayName?: string;
  icon?: string;
  renderer?: string;
  order?: number;
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
