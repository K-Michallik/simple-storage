import { ApplicationNode } from '@universal-robots/contribution-api';

export interface SimpleStorageNode extends ApplicationNode {
  type: string;
  version: string;
}
