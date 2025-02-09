/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { ComponentInputType, DataListItemMainType } from "./DataTypes";
import { Tree, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DrawerCategorySelector = (
  inpuProps: ComponentInputType = {
    dataList: [],
    isLoading: false,
    setIsLoading: () => {},
    handleMenuClick: () => {},
    selectedItemId: "",
  }
) => {
  const [selectedItemIds, setselectedItemIds] = useState<Array<string>>([]);
  const [expandItemIds, setExpandItemIds] = useState<Array<string>>([]);

  /**
   * Get flat children array
   */
  function getFlatChildren(inputChildObj: DataListItemMainType) {
    const child1 = JSON.parse(JSON.stringify(inputChildObj));
    delete child1["children"];
    let itemArr = [child1];
    let childIems = Array.isArray(inputChildObj?.children)
      ? inputChildObj.children
      : [];
    for (const childObj of childIems) {
      itemArr = [...itemArr, ...getFlatChildren(childObj)];
    }
    return itemArr;
  }

  /**
   * Get selected node parentIds
   */
  function getParentNodeIds(
    {
      inputId,
      inputItemArr,
    }: { inputId: string; inputItemArr: Array<DataListItemMainType> } = {
      inputId: "",
      inputItemArr: [],
    }
  ) {
    let parrentArr: Array<string> = [];
    const findObj = (Array.isArray(inputItemArr) ? inputItemArr : []).find(
      (itemObj1: DataListItemMainType) => {
        return itemObj1?.id === inputId;
      }
    );
    if (typeof findObj?.parentId === "string") {
      parrentArr = [
        ...parrentArr,
        findObj.parentId,
        ...getParentNodeIds({
          inputId: findObj.parentId,
          inputItemArr: inputItemArr,
        }),
      ];
    }

    return parrentArr;
  }

  useEffect(() => {
    let flatArr = (
      Array.isArray(inpuProps?.dataList) ? inpuProps.dataList : []
    ).flatMap((itemObj) => {
      const itemArr = getFlatChildren(itemObj);

      return itemArr;
    });

    const expIds = getParentNodeIds({
      inputId: inpuProps?.selectedItemId,
      inputItemArr: flatArr,
    });

    setExpandItemIds(expIds);
  }, [inpuProps?.selectedItemId, inpuProps?.dataList]);

  useEffect(() => {
    if (typeof inpuProps?.selectedItemId === "string") {
      setselectedItemIds([inpuProps.selectedItemId]);
    }
  }, [inpuProps?.selectedItemId]);

  return (
    <>
      <Spin
        spinning={inpuProps?.isLoading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-2xl" />
        }
      >
        {(Array.isArray(inpuProps?.dataList) ? inpuProps.dataList : []).length >
        0 ? (
          <>
            <Tree
              fieldNames={{ key: "id", title: "name" }}
              treeData={inpuProps.dataList}
              autoExpandParent={false}
              onSelect={(selectedKeysValue, info) => {
                setselectedItemIds([info?.selectedNodes?.[0]?.id]);
                inpuProps?.handleMenuClick?.(info?.selectedNodes?.[0]);
              }}
              selectedKeys={selectedItemIds}
              expandedKeys={expandItemIds}
              onExpand={(expandedKeysValue: any) => {
                console.log("onExpand", expandedKeysValue);
                setExpandItemIds(expandedKeysValue);
              }}
            />
          </>
        ) : (
          <></>
        )}
      </Spin>
    </>
  );
};

export default DrawerCategorySelector;
