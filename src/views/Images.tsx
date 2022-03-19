import { useState, useEffect } from 'react';
import { Row, Col, Card, Avatar, message, Spin, Empty, Pagination } from 'antd'
import { useSearchParams } from "react-router-dom";

import { server } from '../server'


const { Meta } = Card;

export function Images() {

    const [searchParams] = useSearchParams();

    const searchQuery = searchParams.get('query')
    const filterTopicsQuery = searchParams.get('filter_topics')

    const [loading, toggleLoading] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const fetchData = async () => {

        toggleLoading(true)

        try {
            const { data: { photos, totalRecords } } = await server.get('', { params: { search: searchQuery, offset: page - 1, filter_topic: filterTopicsQuery } })

            const n = 3 //tweak this to add more items per line
            console.log(searchQuery)
            const result: any = new Array(Math.ceil(photos.length / n))
                //@ts-ignore
                .fill()
                .map(_ => photos.splice(0, n))

            setData(result || [])
            setTotal(totalRecords)
        }
        catch (err) {
            message.error('Error while fetching topics')
            console.error(err)
        }
        finally {
            toggleLoading(false)
        }
    }

    const onChange = (pageNumber: number, _pageSize: number) => setPage(pageNumber)


    useEffect(() => {
        fetchData()
    }, [searchQuery, page])

    useEffect(() => {
        setPage(1)
    }, [total])

    console.log(data)

    return <Spin tip='Fetching Topics' spinning={loading}>

        {data.length ? <>

            {data.map((categories: any[]) => {

                return <>
                    <Row gutter={18} justify='center' style={{ marginTop: 50 }}>
                        {categories.map(({ topic, url, description, link }) => <Col span={4} style={{ height: 500 }}>
                            <Card
                                style={{ width: '100%', height: 500 }}
                                cover={
                                    <img
                                        style={{ height: 370 }}
                                        alt={topic}
                                        src={url}
                                    />
                                }
                            >
                                <Meta style={{ height: 50 }}
                                    title={topic}
                                    description={description || 'No description available'}
                                />
                            </Card>
                        </Col>)}
                    </Row>
                </>

            })}
            <Pagination
                current={page}
                total={total}
                showSizeChanger={false}
                onChange={onChange}
                style={{ marginTop: 30, marginBottom: 30 }}
            />
        </>
            : <Empty description='No result. Please try any other query' />}
    </Spin>



}