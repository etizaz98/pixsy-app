
import { Row, Col, Card, Input } from 'antd'
import { Outlet, useNavigate } from "react-router-dom";


const { Meta } = Card
const { Search } = Input


export function Home(props: any) {

    const navigate = useNavigate();


    const onSearch = (value: string) => navigate({ pathname: '/search', search: `?query=${value}` });

    return <div className="site-card-wrapper" style={{ maxWidth: '100%' }}>
        <Row justify='center' style={{ margin: 50 }}>
            <Col span={8}>
                <Search placeholder="Search here" onSearch={onSearch} enterButton />
            </Col>
        </Row>
        <Outlet />
    </div>

}