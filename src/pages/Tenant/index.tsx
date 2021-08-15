import React from 'react';
import { Input, Button, Table, Card, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { test } from '@/services/retail-app/user/api';

const columns: any = [
  {
    title: 'Id',
    key: 'id',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: true,
  },
];

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
            New
          </Button>
        </Row>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
        />
      </Card>
    </PageContainer>
  );
};

export default Tenant;
