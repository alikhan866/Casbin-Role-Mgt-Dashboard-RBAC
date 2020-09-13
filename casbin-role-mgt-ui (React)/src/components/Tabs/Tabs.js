import React from 'react'
import { Tabs } from 'antd'
import Policies from '../Policies/Policies'
import Roles from '../Roles/Roles'
import Enforcer from '../Enforcer/Enforcer'
import 'antd/dist/antd.css'
const { TabPane } = Tabs;

const MyTabs = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Policies" key="1">
      <Policies />
    </TabPane>
    <TabPane tab="Roles" key="2">
      <Roles />
    </TabPane>
    <TabPane tab="Enforcer" key="3">
      <Enforcer />
    </TabPane>
  </Tabs>
);

export default MyTabs