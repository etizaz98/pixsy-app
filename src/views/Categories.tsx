import { useState, useEffect, useMemo } from 'react'
import { Row, Col, Card, message, Spin } from 'antd'
import { useNavigate } from "react-router-dom";

import { server } from '../server'

const { Meta } = Card


export function Categories() {

    const navigate = useNavigate();


    const [loading, toggleLoading] = useState(false)
    const [data, setData] = useState([])

    const fetchCategories = async () => {

        toggleLoading(true)

        try {
            const { data: { categories } } = await server.get('/categories')

            const n = 3 //tweak this to add more items per line

            const result: any = new Array(Math.ceil(categories.length / n))
                //@ts-ignore
                .fill()
                .map(_ => categories.splice(0, n))

            setData(result || [])
        }
        catch (err) {
            message.error('Error while fetching topics')
            console.error(err)
        }
        finally {
            toggleLoading(false)
        }
    }

    const categoryClick = (category: string) => navigate({ pathname: '/search', search: `?query=${category}&filter_topics=true` })

    useEffect(() => {
        fetchCategories()
    }, [])



    return <Spin tip='Fetching Topics' spinning={loading}>

        {data.map((categories: any[]) => {

            return <>
                <Row gutter={16} justify='center' style={{ marginTop: 150 }}>
                    {categories.map(({ topic, url, count }) => <Col span={4} style={{ height: 350 }}>
                        <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt={topic} src={url} style={{ height: 350 }} />}
                            onClick={() => categoryClick(topic)}
                        >
                            <Meta title={topic} description={count} />
                        </Card>
                    </Col>)}
                </Row>
            </>

        })}
    </Spin>

}