import React from 'react';
import { Input, Button, Table, Card, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { test } from '@/services/retail-app/user/api';

const { Column } = Table;

const Tenant: React.FC = () => {
  const { data, loading } = useRequest(test);

  return (
    <PageContainer
      extra={[<Input placeholder="テナント名" key="search" prefix={<SearchOutlined />} />]}
    >
      <Card>
        <Row justify="space-between" align="bottom" className="mb-1">
          <div>Total results: 40</div>
          <Button type="primary" icon={<PlusOutlined />}>
            新規登録
          </Button>
        </Row>
        <Table loading={loading} dataSource={data} rowKey={(record) => record.id} bordered>
          <Column title="テナントid" dataIndex="id" key="id" />
          <Column title="5 テナント名" dataIndex="name" key="name" />
          <Column title="サービス状態" dataIndex="status" key="status" />
          <Column
            key="action"
            width="200"
            render={() => (
              <>
                <Button>詳細</Button>
                <Button>拠点一覧</Button>
              </>
            )}
          />
        </Table>
      </Card>
    </PageContainer>
  );
};

export default Tenant;
