import type { TreeDataNode } from "antd";

export type DataListItemMainType = TreeDataNode & {
  id: string;
  parentId: string;
  name: string;
  hierarchyLevel: number;
  count: number;
  children?: Array<DataListItemMainType>;
};

export type ComponentInputType = {
  dataList: Array<DataListItemMainType>;
  isLoading: boolean;
  setIsLoading: (isLoad: boolean) => any;
  handleMenuClick: (selectedItem: DataListItemMainType) => any;
  selectedItemId: string;
};
