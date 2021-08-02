[[ define "JSX" ]]

const { Form, Input, Button, Checkbox, Layout } = antd;

const { Header, Content, Footer } = Layout;

const layout = {
  labelCol: { offset: 0, span: 8 },
  wrapperCol: { offset: 0, span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const usernameRules = [
    { required: true, message: "Please type your Username!" },
  ];

  const passwordRules = [
    { required: true, message: "Please type your Password!" },
  ];

  return (
    <Layout className="layout">
      <Content style={{ paddingTop: 50 }}>
        <div
          style={{ background: "#fff", padding: "24px", minHeight: "280px" }}
          className="site-layout-content"
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            [[ template "TextField" . ]]
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

ReactDOM.render(<Demo />, document.querySelector("#root"));
[[ end ]]

[[ define "TextField" ]]
<Form.Item label="Username" name="username" rules={usernameRules}>
  <Input />
</Form.Item>
[[ end ]]
