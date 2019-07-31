import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Container, H1, Text, Badge, Col, Row, Button } from 'native-base'

export default class Detail extends Component {
    render() {
        return (
            <ScrollView>
                <Container
                    style={{
                        marginBottom: 900
                    }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1507546530-14a03f8d180a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=295&q=80' }}
                        style={{
                            width: '100%',
                            height: 200
                        }}
                        blurRadius={0.5}
                        resizeMode='cover'
                    />

                    <Container
                        style={{
                            width: 150,
                            height: 200,
                            alignItems: 'center',
                            position: 'absolute',
                            left: 100,
                            top: 90,
                            right: 100,
                            borderRadius: 20
                        }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1507546530-14a03f8d180a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=295&q=80' }}
                            style={{
                                width: 150,
                                height: 200,
                                borderRadius: 20
                            }} />
                    </Container>
                    <Container
                        style={{
                            marginVertical: 120,
                            marginHorizontal: 10
                        }}>
                        <H1>Title Book</H1>
                        <Row
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20
                            }}>
                            <Col><Badge success><Text>Category</Text></Badge></Col>
                            <Col><Badge primary><Text>Location</Text></Badge></Col>
                            <Col><Badge danger><Text>Status</Text></Badge></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    rounded
                                    success
                                    style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                    <Text
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            textAlign: 'center'
                                        }}>
                                        Loan
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                        <Text
                            style={{
                                textAlign: 'justify',
                                justifyContent: 'center',
                                marginTop: 100
                            }}>Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun. Ia mulai dipopulerkan pada tahun 1960 dengan diluncurkannya lembaran-lembaran Letraset yang menggunakan kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya perangkat lunak Desktop Publishing seperti Aldus PageMaker juga memiliki versi Lorem Ipsum.Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun. Ia mulai dipopulerkan pada tahun 1960 dengan diluncurkannya lembaran-lembaran Letraset yang menggunakan kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya perangkat lunak Desktop Publishing seperti Aldus PageMaker juga memiliki versi Lorem Ipsum.Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun. Ia mulai dipopulerkan pada tahun 1960 dengan diluncurkannya lembaran-lembaran Letraset yang menggunakan kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya perangkat lunak Desktop Publishing seperti Aldus PageMaker juga memiliki versi Lorem Ipsum.</Text>
                    </Container>
                </Container>
            </ScrollView >
        )
    }
}
