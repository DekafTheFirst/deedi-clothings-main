import React from 'react'
import "./List.scss"
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import { CircularProgress } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'


const List = ({ subCats, maxPrice, sort, catSlug }) => {

    const { data, loading, error } = useFetch(`/products?populate=*&[filters] [categories] [slug]=${catSlug}${subCats.map(item => `&[filters][sub_categories][id][$eq]=${item}`)}&[filters] [price] [$lte]=${maxPrice}&sort=price:${sort}`)
    console.log(data)
    
    const interceptedData  = [
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "attributes": {
                "title": "Test Product",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis sem, ullamcorper eget auctor ac, pharetra efficitur lorem. Ut nec lorem in elit laoreet consectetur sed id arcu. Aliquam erat volutpat. Praesent vestibulum sollicitudin erat, vel mollis elit dapibus at. Vestibulum ut orci rhoncus, hendrerit dolor et, congue neque. Nam ac viverra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "price": 200,
                "isNew": true,
                "createdAt": "2024-03-25T14:34:10.811Z",
                "updatedAt": "2024-03-28T16:07:20.245Z",
                "publishedAt": "2024-03-25T14:45:08.029Z",
                "type": "trending",
                "img": {
                    "data": {
                        "id": 8,
                        "attributes": {
                            "name": "1.1.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 960,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_1_5ae05bd54c.jpg",
                                    "hash": "small_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "small_1.1.jpg",
                                    "path": null,
                                    "size": 22.77,
                                    "width": 333,
                                    "height": 500,
                                    "sizeInBytes": 22768
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_1_5ae05bd54c.jpg",
                                    "hash": "medium_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.1.jpg",
                                    "path": null,
                                    "size": 48.19,
                                    "width": 500,
                                    "height": 750,
                                    "sizeInBytes": 48186
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_1_5ae05bd54c.jpg",
                                    "hash": "thumbnail_1_1_5ae05bd54c",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.1.jpg",
                                    "path": null,
                                    "size": 4.2,
                                    "width": 104,
                                    "height": 156,
                                    "sizeInBytes": 4204
                                }
                            },
                            "hash": "1_1_5ae05bd54c",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 79.59,
                            "url": "/uploads/1_1_5ae05bd54c.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:26.453Z",
                            "updatedAt": "2024-03-25T14:33:26.453Z"
                        }
                    }
                },
                "img2": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "1.2.jpg",
                            "alternativeText": null,
                            "caption": null,
                            "width": 640,
                            "height": 853,
                            "formats": {
                                "small": {
                                    "ext": ".jpg",
                                    "url": "/uploads/small_1_2_43b7c93bbc.jpg",
                                    "hash": "small_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "small_1.2.jpg",
                                    "path": null,
                                    "size": 34.83,
                                    "width": 375,
                                    "height": 500,
                                    "sizeInBytes": 34827
                                },
                                "medium": {
                                    "ext": ".jpg",
                                    "url": "/uploads/medium_1_2_43b7c93bbc.jpg",
                                    "hash": "medium_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "medium_1.2.jpg",
                                    "path": null,
                                    "size": 71.34,
                                    "width": 563,
                                    "height": 750,
                                    "sizeInBytes": 71340
                                },
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": "/uploads/thumbnail_1_2_43b7c93bbc.jpg",
                                    "hash": "thumbnail_1_2_43b7c93bbc",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_1.2.jpg",
                                    "path": null,
                                    "size": 4.81,
                                    "width": 117,
                                    "height": 156,
                                    "sizeInBytes": 4811
                                }
                            },
                            "hash": "1_2_43b7c93bbc",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 89.61,
                            "url": "/uploads/1_2_43b7c93bbc.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2024-03-25T14:33:25.683Z",
                            "updatedAt": "2024-03-25T14:33:25.683Z"
                        }
                    }
                },
                "categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "men",
                                "desc": "Men Clothings",
                                "createdAt": "2024-03-25T14:41:52.833Z",
                                "updatedAt": "2024-03-30T15:35:54.144Z",
                                "publishedAt": "2024-03-25T14:42:03.700Z",
                                "slug": "men"
                            }
                        }
                    ]
                },
                "sub_categories": {
                    "data": [
                        {
                            "id": 2,
                            "attributes": {
                                "title": "t-shirt",
                                "createdAt": "2024-03-25T14:43:47.762Z",
                                "updatedAt": "2024-03-25T14:43:57.992Z",
                                "publishedAt": "2024-03-25T14:43:57.985Z"
                            }
                        }
                    ]
                }
            }
        }
    ]
    const images = [
        { url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },
        { url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },{ url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },{ url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },{ url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },{ url: '/img/products/1.1.jpg' },
        { url: '/img/products/1.2.jpg' },
        { url: '/img/products/2.1.jpg' },
        { url: '/img/products/2.2.jpg' },
        { url: '/img/products/3.1.jpg' },
        { url: '/img/products/3.2.jpg' },
        { url: '/img/products/4.1.jpg' },
        { url: '/img/products/4.2.jpg' },
    ]

    return (
        <div className="list">
            {loading
                ? <CircularProgress />
                : data?.map(item => (<Card item={item} key={item.id} />))}
            {/* {images.map((img, index) => 
                (<LazyLoadImage
                    key={index}
                    src={img.url}
                    effect="blur"
                    height={400}
                    width={400}
                    placeholderSrc={img.url}
                />)
            )} */}
        </div>
    )
}

export default List