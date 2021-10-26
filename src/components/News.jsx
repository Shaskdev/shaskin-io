import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    if (!cryptoNews?.value) return "Loading ..."; 
    
    
    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="Children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0 }
                    >
                    <Option value="Cryptocurrency">Cryptocurrency</Option>

                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage } alt='' />
                            </div>
                             <p> {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description} </p>
                            <div className="provider-container">
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                                <Text className="provider-name">{news.provider[0]?.name}</Text>
                            </div>
                            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
