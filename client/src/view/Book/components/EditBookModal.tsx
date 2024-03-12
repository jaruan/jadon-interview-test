import { Modal } from "antd";
import dayjs from "dayjs";
import { Button, Form, Input, type FormProps, DatePicker } from "antd";
import { IBookDTO } from "../../../dto/book";

export default function EditBookModal(props: IEditBookModalProps) {
  const onFinish: FormProps<IBookDTO>["onFinish"] = (values) => {
    console.log("Success:", values);
    props.onSubmitForm(values);
  };

  return (
    <>
      <Modal
        centered
        title={props.header}
        open={true}
        width={800}
        footer={null}
        onCancel={() => props.onClose()}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={props.data || {}}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {props?.data?.id && (
            <Form.Item<IBookDTO> label="Id" name="id">
              <Input contentEditable={false} disabled value={props.data.id} />
            </Form.Item>
          )}
          <Form.Item<IBookDTO>
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the book title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IBookDTO> label="Author" name="author">
            <Input />
          </Form.Item>

          <Form.Item<IBookDTO>
            label="Publication Year"
            name="publicationYear"
            getValueProps={(year: string) => ({
              value: year ? dayjs(year, "YYYY") : dayjs(),
            })}
            getValueFromEvent={(date) => date.format("YYYY")}
          >
            <DatePicker picker="year" />
          </Form.Item>

          <Form.Item<IBookDTO>
            label="ISBN"
            name="isbn"
            rules={[
              {
                validator: (_, value) => {
                  if (value) {
                    if (value.length >= 10 && value.length <= 13) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "ISBN must be between 10 and 13 digits!"
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
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

export interface IEditBookModalProps {
  header: string;
  data?: IBookDTO | null;
  onClose: () => void;
  onSubmitForm: (bookRequestDTO: IBookDTO) => void;
}
