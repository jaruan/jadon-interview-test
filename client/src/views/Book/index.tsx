import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import styles from "./styles.module.scss";
import ActionModal from "./components/ActionModal";

const { Column } = Table;

interface DataType {
  id: React.Key;
  title: String;
  author: String;
  publicationYear: String;
}

const data: DataType[] = [
  {
    id: 1,
    title: "title",
    author: "author",
    publicationYear: "2014",
  },
  {
    id: 2,
    title: "title2",
    author: "author2",
    publicationYear: "2015",
  },
];

export default function Book() {
  const [isOpenActionModal, setOpenActionModal] = useState(false);
  console.log(isOpenActionModal);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Button type="primary" onClick={() => setOpenActionModal(true)}>
        Add Book
      </Button>
      <Table dataSource={data}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column
          title="Publication Year"
          dataIndex="publicationYear"
          key="publicationYear"
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button type="link" onClick={() => {}}>
                Edit
              </Button>
              <Button type="link">Delete</Button>
            </Space>
          )}
        />
      </Table>
      <ActionModal
        header="Edit Book"
        visible={isOpenActionModal}
        onClose={() => setOpenActionModal(false)}
      />
    </div>
  );
}
