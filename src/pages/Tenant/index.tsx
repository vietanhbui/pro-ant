import React from 'react';
import { Input, Button, Table, Card, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const columns: any = [
  {
    title: 'Id',
    key: 'id',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: true,
  },
];

const dataSource: any = [];
for (let index = 0; index < 40; index += 1) {
  dataSource.push({ id: index, name: `Name ${index}`, status: 'Active' });
}

const Tenant: React.FC = () => {
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
        <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      </Card>
    </PageContainer>
  );
};

export default Tenant;
