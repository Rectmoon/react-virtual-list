import Vlist from "./VList";
import { Button, Modal, List } from "antd";
import faker from "faker";
import { css } from "@emotion/css";
import React from "react";
import "antd/dist/antd.css";

const data = [];
const dataLength = 10000;
for (let id = 0; id < dataLength; ++id) {
  data.push({
    id,
    value: faker.lorem.sentences()
  });
}

const userVisibleHeight = 800;
const estimateRowHeight = 94;
const bufferSize = 5;

export default function DummyComp() {
  const [vmodalVisible, setvModalVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleVModalVisible = React.useCallback(() => {
    setvModalVisible(!vmodalVisible);
  }, [vmodalVisible, setvModalVisible]);

  const toggleModalVisible = React.useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible, setModalVisible]);

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <Button
        className={css`
          margin-bottom: 30px;
        `}
        onClick={toggleModalVisible}
        type="primary"
      >
        打开List编辑器
      </Button>
      <Button onClick={toggleVModalVisible} type="primary">
        打开V-List编辑器
      </Button>

      <Modal
        visible={vmodalVisible}
        onCancel={toggleVModalVisible}
        footer={false}
        getContainer={false}
        bodyStyle={{ padding: "50px 20px" }}
      >
        <div
          className={css`
            border: 1px solid #e8e8e8;
          `}
        >
          <Vlist
            height={userVisibleHeight}
            total={dataLength}
            estimateRowHeight={estimateRowHeight}
            bufferSize={bufferSize}
            rowRenderer={(index: number, styleData: any) => {
              const item = index;
              return (
                <div
                  key={item}
                  className={css`
                    width: 100%;
                    padding: 20px;
                    border-bottom: 1px solid #000;
                  `}
                  style={styleData}
                  onClick={() => {
                    console.log("item-", index);
                  }}
                  id={`item-${index}`}
                >
                  <span
                    className={css`
                      display: block;
                      color: rgba(0, 0, 0, 0, 85);
                      font-weight: 500;
                      font-size: 14px;
                    `}
                  >
                    Item - {data[index].id} Data:
                  </span>
                  <span
                    className={css`
                      width: 100%;
                      color: rgba(0, 0, 0, 0.5);
                      font-size: 16px;
                    `}
                  >
                    {data[index].value}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </Modal>

      <Modal
        visible={modalVisible}
        onCancel={toggleModalVisible}
        footer={false}
        getContainer={false}
        bodyStyle={{
          padding: "50px 20px"
        }}
      >
        <div
          className={css`
            border: 1px solid #e8e8e8;
            height: ${userVisibleHeight}px;
            overflow: auto;
          `}
        >
          <List
            dataSource={data}
            renderItem={(item: any) => {
              // const item = index;
              return (
                <List.Item>
                  <div
                    key={item.id}
                    className={css`
                      width: 100%;
                      padding: 20px;
                      border-bottom: 1px solid #000;
                    `}
                  >
                    <span
                      className={css`
                        display: block;
                        color: rgba(0, 0, 0, 0, 85);
                        font-weight: 500;
                        font-size: 14px;
                      `}
                    >
                      Item - {item.id} Data:
                    </span>
                    <span
                      className={css`
                        width: 100%;
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 16px;
                      `}
                    >
                      {item.value}
                    </span>
                  </div>
                </List.Item>
              );
            }}
          ></List>
        </div>
      </Modal>
    </div>
  );
}
