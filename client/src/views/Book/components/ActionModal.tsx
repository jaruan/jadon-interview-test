import { Modal } from "antd";

import { Button, Form, Input } from "antd";
import { IBookRequestDTO } from "../../../dto/book";

export default function ActionModal(props: IActionModalProps) {
  return (
    <>
      <Modal
        centered
        title={props.header}
        open={props.visible}
        width={800}
        footer={null}
        onCancel={() => props.onClose()}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<IBookRequestDTO>
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the book title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IBookRequestDTO> label="Author" name="author">
            <Input />
          </Form.Item>

          <Form.Item<IBookRequestDTO>
            label="Publication Year"
            name="publicationYear"
          >
            <Input />
          </Form.Item>

          <Form.Item<IBookRequestDTO> label="ISBN" name="isbn">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export interface IActionModalProps {
  header: string;
  visible: boolean;
  data?: IBookRequestDTO;
  onClose: () => void;
}
