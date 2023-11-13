/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';

import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '../../types/types';
import { ChartData, ChartOptions } from 'chart.js';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import ClipLoader from "react-spinners/ClipLoader";
import './page.css';
const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};


const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const [isLoading, setisLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState('0');
    const toast: any = useRef(null);
    const [valuetitle, setValue_title] = useState("");
    const [valuedivision, setValue_division] = useState("");
    const [textbefore, setText_before]: any = useState("");
    const [textafter, setText_after]: any = useState("");
    const [checkedOK, setCheckedOK] = useState(false);
    const [checkedNotOK, setCheckedNotOK] = useState(false);
    const [check_15, setcheck_15] = useState(false);
    const [check_12, setcheck_12] = useState(false);
    const [check_9, setcheck_9] = useState(false);
    const [check_7, setcheck_7] = useState(false);
    const [check_5, setcheck_5] = useState(false);
    const [check_3, setcheck_3] = useState(false);
    const [check_2, setcheck_2] = useState(false);
    const [getId, setgetId]: any = useState('');
    const header = (
        <span className="ql-formats editor">
            <button className="ql-image" aria-label="Image"></button>
            <button className="ql-bold" aria-label="Bold"></button>
            {/* <button className="ql-align" aria-label="align"></button> */}
        </span>
    );

    const emptyForm = {
        id: null,
        createby: "",
        date_createby: null,
        title: "",
        division: "",
        before_data: "",
        after_data: "",
        employee_number: "",
        effects_q: "",
        effects_c: "",
        effects_d: "",
        effects_s: "",
        effects_e: "",
        comment_ass: "",
        comment_status: "",
        concern: "",
        score1_1_1: "",
        score1_1_2: "",
        score1_2_1: "",
        score1_2_2: "",
        score1_3_1: "",
        score1_3_2: "",
        score1_4_1: "",
        score1_4_2: "",
        score1_5_1: "",
        score1_5_2: "",
        score2_1_1: "",
        score2_1_2: "",
        score2_2_1: "",
        score2_2_2: "",
        score2_3_1: "",
        score2_3_2: "",
        total1_1: "",
        total1_2: "",
        total2_1: "",
        total2_2: "",
        totalsum1: "",
        totalsum2: "",
        status: "",
    };
    const [dataKaizen, setdataKaizen] = useState(emptyForm);
    const check_id: any = localStorage.getItem('dataID');
    useEffect(() => {

        const formcheckID: any = new FormData();
        formcheckID.append('id_kaizen', check_id);
        formcheckID.append('em_id', localStorage.getItem('Em_id'));
        const requestOptions = {
            method: "POST",
            headers: { accept: "application/json" },
            body: formcheckID,
        };
        fetch("http://localhost:8000/api/getdataEdit", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setdataKaizen(data),
                    setText_before(data.before_data),
                    setText_after(data.after_data)
            })
    }, [check_id])
    ////////////////////////////////////////
    const onInputChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || "";
        const _newData: any = { ...dataKaizen };

        _newData[`${name}`] = val;

        setdataKaizen(_newData);
    };

    const [style, setStyle] = useState({ opacity: 1, backgroundColor: '' })

    function saveKaizen() {
        console.log('test')
        setisLoading(true);
        // console.log(dataKaizen.title)
        setStyle({ opacity: 0.5, backgroundColor: '' })
        if ('step_1' == 'step_1') {
            const formDataStep_1: any = new FormData();
            formDataStep_1.append('title', dataKaizen.title);
            formDataStep_1.append('division', dataKaizen.division);
            formDataStep_1.append('textbefore', textbefore);
            formDataStep_1.append('textafter', textafter);
            formDataStep_1.append('createby', 'Jakkawan.s');
            formDataStep_1.append('employee_number', dataKaizen.employee_number);
            formDataStep_1.append('date_createby', dataKaizen.date_createby);
            formDataStep_1.append('status', '2');
            formDataStep_1.append('em_id', localStorage.getItem('Em_id'));
            const requestOptions = {
                method: "POST",
                headers: { accept: "application/json" },
                body: formDataStep_1,
            };
            fetch("http://localhost:8000/api/insert_step_1", requestOptions)
                .then((response) => response.json())
                .then((data) => window.location.replace('http://localhost:9900/uikit/button')
                );
        }
    };
    // const step_1 = () => {
    //     console.log(dataKaizen.title)
    // };

    console.log(dataKaizen)
    return (
        <>
            <div className='text-center'>
                {isLoading === true && (
                    <ClipLoader
                        className='loader'
                        // style={{ opacity: '0.5' }}
                        color="#36d7b7"
                        size={30}
                    />
                )
                }
            </div>
            <div className="page p-1 padding-head ">
                {/* <form> */}
                {/* <div>
                    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                </div> */}
                {/* <div className="flex justify-content-center"> */}
                {/* </div> */}
                {/* <Card className="   page"> */}

                <div className="border-1 test-12" style={style}>
                    <div className="flex w-full border-bottom-1 justify-content-end  col-12">
                        <p className="text-right text-xs">FM-QS-KZ-03 Rev.02</p>
                    </div>

                    {/* text FM */}
                    <div className='test'>
                        <div className="test align-items-center justify-content-end border-bottom-1 col-8">
                            <div className='col-5'></div>
                            <div className='col-5'>
                                <p className=" text-xl font-bold" style={{ padding: "2px" }}>
                                    KAIZEN prososal
                                </p>
                            </div>
                        </div>
                        <div className="test align-items-center justify-content-center border-bottom-1 col-4">
                            <div className="col-4" >
                                <div className="col-12">
                                    <p className="" style={{ fontSize: ".75rem" }}>
                                        เลขที่เอกสาร. :
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p className="" style={{ fontSize: ".75rem" }}>
                                        วันที่รับ. :
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='test col-12 '>
                        <div className="test border-bottom-1 col-6 justify-content-center" >
                            <div className='flex-mobile '>
                                <div
                                    className=" align-items-center pb-1 pt-1 col-title"
                                >
                                    <a className="pr-2 col-title" style={{ fontSize: ".75rem" }}>
                                        ชื่อเรื่อง
                                    </a>
                                </div>
                                <div
                                    className="fieldvertical-align-middle test  pb-1 pt-1 col-title-input"
                                >
                                    <InputTextarea
                                        className="textarea "
                                        id="title"
                                        style={{ fontSize: ".75rem", }}
                                        value={dataKaizen.title}
                                        onChange={(e) => onInputChange(e, "title")}
                                        rows={1}
                                        cols={38}
                                        autoResize
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="test border-bottom-1 col-6 justify-content-center">
                            <div className='flex-mobile'>
                                <div
                                    className=" align-items-center pb-1 pt-1 col-title"
                                >
                                    <a className="pr-2" style={{ fontSize: ".75rem" }}>
                                        แผนก
                                    </a>
                                </div>
                                <div
                                    className="fieldvertical-align-middle test align-items-center pb-1 pt-1 col-title-input"
                                >
                                    <InputTextarea
                                        id="division"
                                        className="textarea"
                                        style={{ fontSize: ".75rem" }}
                                        value={dataKaizen.division}
                                        onChange={(e) => onInputChange(e, "division")}
                                        rows={1}
                                        autoResize
                                        cols={38}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="test border-bottom-1 col-12"> */}
                    <div className='col-12 test'>
                        <div className='test flex-column col-6'>
                            <div
                                className="text-center vertical-align-middle border-right-1 col-12 border-bottom-1"
                            >
                                <a style={{ fontSize: ".75rem" }}>
                                    Before (ก่อนการปรับปรุง)
                                </a>
                            </div>
                            <div
                                className="before  diveditor border-right-1 col-12"

                            >
                                <Editor
                                    value={textbefore}
                                    onTextChange={(e) => setText_before(e.htmlValue)}
                                    headerTemplate={header}
                                    style={{ height: "270px" }}
                                />
                            </div>
                        </div>
                        <div className='test flex-column col-6'>
                            <div
                                className="text-center vertical-align-middle col-12 border-bottom-1 border_header_signature"
                            >
                                <a style={{ fontSize: ".75rem" }}>
                                    After (หลังการปรับปรุง)
                                </a>
                            </div>
                            <div className="after diveditor col-12">
                                <Editor
                                    value={textafter}
                                    headerTemplate={header}
                                    onTextChange={(e) => setText_after(e.htmlValue)}
                                    style={{ height: "270px" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="test border-top-1 col-12">
                        <div className="vertical-align-middle col-4 test" >
                            <div className='test flex-column col-12'>
                                <div className='test col-12'>
                                    <div className="border-right-1 col-2 border-bottom-1" ></div>
                                    <div
                                        className="text-left col-10  border-bottom-1"
                                    >
                                        <a className="pl-2" style={{ fontSize: ".75rem" }}>
                                            ผลกระทบ (Effects)
                                        </a>
                                    </div>
                                </div>
                                <div className='flex-mobile  col-12 effect_q  border-bottom-1'>
                                    <div
                                        className=" text-center border-right-1 mobile-2 "
                                    >
                                        <a className="font-bold " style={{ fontSize: ".75rem" }}>
                                            Q
                                        </a>
                                    </div>
                                    <div
                                        className="text-left mobile-10"
                                    >
                                        <InputText
                                            className="textinput text-left"
                                            id="Effects_Q"
                                            style={{
                                                width: "100%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.effects_q}
                                            onChange={(e) => onInputChange(e, "effects_q")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='flex-mobile col-12 effect_c  border-bottom-1'>
                                    <div
                                        className="   text-center border-right-1 mobile-2"
                                    >
                                        <a className="font-bold " style={{ fontSize: ".75rem" }}>
                                            C
                                        </a>
                                    </div>
                                    <div
                                        className="text-left mobile-10 "
                                    >
                                        <InputText
                                            className="textinput text-left"
                                            id="Effects_C"
                                            style={{
                                                width: "100%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.effects_c}
                                            onChange={(e) => onInputChange(e, "effects_c")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='flex-mobile col-12 effect_d  border-bottom-1'>
                                    <div
                                        className="   text-center border-right-1 mobile-2"
                                    >
                                        <a className="font-bold " style={{ fontSize: ".75rem" }}>
                                            D
                                        </a>
                                    </div>
                                    <div
                                        className="text-left mobile-10 "
                                    >
                                        <InputText
                                            className="textinput text-left"
                                            id="Effects_D"
                                            style={{
                                                width: "100%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.effects_c}
                                            onChange={(e) => onInputChange(e, "effects_c")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='flex-mobile col-12 effect_s  border-bottom-1'>
                                    <div
                                        className="   text-center border-right-1 mobile-2"
                                    >
                                        <a className="font-bold " style={{ fontSize: ".75rem" }}>
                                            S
                                        </a>
                                    </div>
                                    <div
                                        className="text-left mobile-10 "
                                    >
                                        <InputText
                                            className="textinput text-left"
                                            id="Effects_S"
                                            style={{
                                                width: "100%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.effects_c}
                                            onChange={(e) => onInputChange(e, "effects_c")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='flex-mobile col-12 effect_e  border-bottom-1'>
                                    <div
                                        className="   text-center border-right-1 mobile-2"
                                    >
                                        <a className="font-bold " style={{ fontSize: ".75rem" }}>
                                            E
                                        </a>
                                    </div>
                                    <div
                                        className="text-left mobile-10"
                                    >
                                        <InputText
                                            className="textinput text-left"
                                            id="Effects_E"
                                            style={{
                                                width: "100%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.effects_c}
                                            onChange={(e) => onInputChange(e, "effects_c")}
                                        ></InputText>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vertical-align-middle border-bottom-1 col-2 test border_date_now" >
                            <div className='test flex-column col-12 border-right-1'>
                                <div className='test col-12 '>
                                    <div
                                        className="text-center col-12"
                                    >
                                        <a style={{ fontSize: ".75rem" }}>วันที่ดำเนินการ</a>
                                    </div>
                                </div>
                                <div className='test col-12  border-top-1 '>
                                    <div
                                        className="text-center col-12"
                                    >
                                        <a style={{ fontSize: ".75rem" }}>imputtext</a>
                                    </div>
                                </div>
                                <div className='test col-12 border-top-1'>
                                    <div
                                        className="text-center col-12"
                                    >
                                        <a className="" style={{ fontSize: ".75rem" }}>
                                            ความเห็นAsstMgr/Manager
                                        </a>
                                    </div>
                                </div>
                                <div className='test col-12'>
                                    <div
                                        className="text-center border-top-1 col-12"
                                    >
                                        <InputTextarea
                                            className="textarea"
                                            id="comment_ass"
                                            style={{
                                                fontSize: ".75rem",
                                                width: "100%",
                                                height: "90%",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.comment_ass}
                                            onChange={(e) => onInputChange(e, "comment_ass")}
                                            rows={4}
                                            maxLength={72}
                                            autoResize
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='vertical-align-middle border-bottom-1 col-6 test'>
                            <div className='test flex-column col-12'>
                                <div className='test col-12'>
                                    <div
                                        className="border-right-1 text-left col-7"
                                    >
                                        <a style={{ fontSize: ".75rem" }}>ชื่อ: </a>
                                        <InputText
                                            className="textinput"
                                            id="namecreate"
                                            style={{
                                                width: "91%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.createby}
                                            onChange={(e) => onInputChange(e, "createby")}
                                        ></InputText>
                                    </div>
                                    <div className="text-left col-5">
                                        <a style={{ fontSize: ".75rem" }}>รหัสพนักงาน: </a>
                                        <InputText
                                            className="textinput"
                                            id="numbercreate"
                                            style={{
                                                width: "56%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.employee_number}
                                            onChange={(e) => onInputChange(e, "employee_number")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='test col-12 border-top-1'>
                                    <div className="text-left col-12">
                                        <a style={{ fontSize: ".75rem" }}>วันที่ส่งเอกสาร: </a>
                                        <InputText
                                            className="textinput"
                                            id="datecreate"
                                            style={{
                                                width: "80%",
                                                fontSize: ".75rem",
                                                // height: "5%",
                                                padding: 0,
                                            }}
                                            // value={dataKaizen.date_createby}
                                            onChange={(e) => onInputChange(e, "date_createby")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='test col-12'>
                                    <div className='col-8 test border-top-1'>
                                        <div className='test flex-column col-12'>
                                            <div className="border-bottom-1 border-right-1 col-12">
                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                    Division (ต้นสังกัด)
                                                </a>
                                            </div>
                                            <div className='flex-mobile '>
                                                <div className='col4-mobile border-right-mobile'>
                                                    <div className='col-12 test '>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center border-bottom-1' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    ผู้เสนอ
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test' >
                                                        <div className=' col-12 border-right-1'>
                                                            <div className='border-bottom-1 text-center padding-sig' >
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    imagesignature
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test '>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center '>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    namesognature
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col4-mobile border-right-mobile'>
                                                    <div className='col-12 test '>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center border-bottom-1' >
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    หัวหน้างาน
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test' >
                                                        <div className=' col-12 border-right-1 ' >
                                                            <div className='border-bottom-1 text-center padding-sig' >
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    imagesignature
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center '>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    namesognature
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col4-mobile'>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center border-bottom-1' >
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    ผู้จัดการ
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test' >
                                                        <div className=' col-12 border-right-1 ' >
                                                            <div className='border-bottom-1 text-center padding-sig'>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    imagesignature
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center ' >
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    namesognature
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-4 test'>
                                        <div className='test flex-column col-12'>
                                            <div className="border-bottom-1 border-top-1 col-12">
                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                    Committee (คณะกรรมการฯ)
                                                </a>
                                            </div>
                                            <div className='flex-mobile '>
                                                <div className='col6-mobile border-right-mobile'>
                                                    <div className='col-12 test '>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center border-bottom-1' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    EVA
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12 border-right-1  padding-sig'>
                                                            <div className='border-bottom-1 text-center ' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    signature
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12 border-right-1 '>
                                                            <div className='text-center ' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    signature
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col6-mobile'>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12'>
                                                            <div className='text-center border-bottom-1' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    Judge
                                                                </a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className=' col-12 test' >
                                                        <div className=' col-12 padding-sig '>
                                                            <div className='border-bottom-1 text-center ' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    siignature
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 test'>
                                                        <div className=' col-12'>
                                                            <div className='text-center ' style={{ height: '100%' }}>
                                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                                    signature
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='test col-12'>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Comment */}
                    <div className="test border-bottom-1 col-12 ">
                        <div className='test flex-column col-10 '>
                            <div className="text-left col-12 border-right-1 border-bottom-1">
                                <a className="text" style={{ fontSize: ".800rem" }}>
                                    ความคิดเห็นของแผนกที่เกี่ยวข้อง (concern division) :
                                </a>
                                <a className="text" style={{ fontSize: ".800rem" }}>
                                    [_____________________________]
                                </a>
                            </div>
                            <div className='test'>
                                <div className='col-6'>
                                    <div
                                        className="text-left border-right-1 col-12"
                                    >
                                        <Checkbox
                                            className="checkboxs"
                                            id="checkok"
                                            // onChange={(e) => setCheckedOK(e.checked)}
                                            checked={checkedOK}
                                        ></Checkbox>
                                        <a className="text-xs"> OK</a>
                                    </div>
                                    <div
                                        className="text-left border-right-1 col-12"
                                    >
                                        <a className="text-xs">Comment </a>
                                        <InputText
                                            className="textinput text-left"
                                            id="comment_1"
                                            style={{
                                                width: "78%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.comment_status}
                                            onChange={(e) => onInputChange(e, "comment_status")}
                                        ></InputText>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div
                                        className="text-left border-right-1 col-12"
                                    >
                                        <Checkbox
                                            className="checkboxs"
                                            id="checknotok"
                                            // onChange={(e) => setCheckedNotOK(e.checked)}
                                            checked={checkedNotOK}
                                        ></Checkbox>
                                        <a className="text-xs"> Not OK</a>
                                    </div>
                                    <div
                                        className="text-left border-right-1 col-12"
                                    >
                                        <a className="text-xs"> Comment </a>
                                        <InputText
                                            className="textinput text-left"
                                            id="comment_2"
                                            style={{
                                                width: "78%",
                                                fontSize: ".75rem",
                                                padding: 0,
                                            }}
                                            value={dataKaizen.comment_status}
                                            onChange={(e) => onInputChange(e, "comment_status")}
                                        ></InputText>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="test flex-column col-2">
                            <div className='text-center border_header_signature border-bottom-1'>
                                <a className="text" style={{ fontSize: ".800rem" }}>
                                    AsstMgr./Manager
                                </a>
                            </div>
                            <div className="text-center">
                                <a className="text-sm">(..................................)</a>
                            </div>
                            <div className="text-center">
                                <a className="text-sm">Date..............................</a>
                            </div>
                        </div>

                    </div>

                    {/* Comment */}
                    <div className='test'>
                        <div className="flex-mobile flex-column col-7">
                            <div className="text-left test flex-column col-12">
                                <div className='col-12'>
                                    <a className="text" style={{ fontSize: ".800rem" }}>
                                        1. Evaluation score & reward (ให้คะแนนโดย Asst MGR up)
                                    </a>
                                </div>
                                <div className='test'>
                                    <div className='col-item-mobile'>
                                        <div className='col-12-div-item flex-mobile '>
                                            <div className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item  border-right-mobile"
                                            >
                                                <a className="text-xs">Item-1</a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score"
                                            >
                                                <a className="text-xs">Score-1</a>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile '>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile "
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    คุณภาพ(Quality)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile  "
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile  "
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_1_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_1_1}
                                                    onChange={(e) => onInputChange(e, "score1_1_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_1_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_1_2}
                                                    onChange={(e) => onInputChange(e, "score1_1_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    ต้นทุน(Cost)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_2_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_2_1}
                                                    onChange={(e) => onInputChange(e, "score1_2_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_2_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_2_2}
                                                    onChange={(e) => onInputChange(e, "score1_2_2")}
                                                ></InputText>
                                            </div>

                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    การขนส่ง (Delivery)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_3_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_3_1}
                                                    onChange={(e) => onInputChange(e, "score1_3_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_3_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_3_2}
                                                    onChange={(e) => onInputChange(e, "score1_3_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    ความปลอดภัย (Safety)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_4_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_4_1}
                                                    onChange={(e) => onInputChange(e, "score1_4_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_4_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_4_2}
                                                    onChange={(e) => onInputChange(e, "score1_4_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    สิ่งแวดล้อม(Environment)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_5_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_5_1}
                                                    onChange={(e) => onInputChange(e, "score1_5_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score1_5_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score1_5_2}
                                                    onChange={(e) => onInputChange(e, "score1_5_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 col-3-item-data"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value border-bottom-1 border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="total1_1"
                                                    keyfilter="int"
                                                    max={20}
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.total1_1}
                                                    onChange={(e) => onInputChange(e, "total1_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 border-bottom-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="total1_2"
                                                    keyfilter="int"
                                                    max={20}
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.total1_2}
                                                    onChange={(e) => onInputChange(e, "total1_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-item-mobile'>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item  border-right-mobile"
                                            >
                                                <a className="text-xs">Item-2</a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score"
                                            >
                                                <a className="text-xs">Score-2</a>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    ความคิดสร้างสรรค์(Idea)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score2_1_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_1_1}
                                                    onChange={(e) => onInputChange(e, "score2_1_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score2_1_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_1_2}
                                                    onChange={(e) => onInputChange(e, "score2_1_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    ความพยายาม (Effort)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score2_2_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_2_1}
                                                    onChange={(e) => onInputChange(e, "score2_2_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    id="score2_2_2"
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_2_2}
                                                    onChange={(e) => onInputChange(e, "score2_2_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    ความยั่งยืน(Sustainability)
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}>
                                                    Max 4
                                                </a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score2_3_1"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_3_1}
                                                    onChange={(e) => onInputChange(e, "score2_3_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="score2_3_2"
                                                    keyfilter="int"
                                                    max={4}
                                                    maxLength={1}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.score2_3_2}
                                                    onChange={(e) => onInputChange(e, "score2_3_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile'>
                                            <div
                                                className="text-left vertical-align-middle border-top-1 col-3-item-data"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-3-item-max"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-left-mobile border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="total2_1_1"
                                                    keyfilter="int"
                                                    max={12}
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.total2_1}
                                                    onChange={(e) => onInputChange(e, "total2_1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="total2_1_2"
                                                    keyfilter="int"
                                                    max={12}
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.total2_2}
                                                    onChange={(e) => onInputChange(e, "total2_2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile padding-set'>
                                            <div
                                                className="text-left vertical-align-middle col-3-item-data "
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle col-3-item-max "
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 col-2-score-value"
                                            >

                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-top-1 col-2-score-value"
                                            >
                                            </div>
                                        </div>
                                        <div className='col-12-div-item flex-mobile padding-score-sum'>
                                            <div
                                                className="text-center vertical-align-middle border-right-1 col-3-item-max disnone"
                                            >
                                                <a className="" style={{ fontSize: ".55rem" }}></a>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-bottom-1 border-top-1 border-right-1 col-3-item-data  border-right-mobile"
                                            >
                                                <a className="" style={{ fontSize: ".75rem" }}>
                                                    Score 1+2
                                                </a>
                                            </div>

                                            <div
                                                className="text-center vertical-align-middle border-bottom-1 border-top-1 border-right-1 col-2-score-value  border-right-mobile"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="totalsum1"
                                                    keyfilter="int"
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.totalsum1}
                                                    onChange={(e) => onInputChange(e, "totalsum1")}
                                                ></InputText>
                                            </div>
                                            <div
                                                className="text-center vertical-align-middle border-bottom-1 border-top-1 border-right-1 col-2-score-value"
                                            >
                                                <InputText
                                                    className="textinput text-center"
                                                    id="totalsum2"
                                                    keyfilter="int"
                                                    maxLength={2}
                                                    style={{
                                                        width: "56%",
                                                        fontSize: ".55rem",
                                                        padding: 0,
                                                    }}
                                                    value={dataKaizen.totalsum2}
                                                    onChange={(e) => onInputChange(e, "totalsum2")}
                                                ></InputText>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="flex-mobile flex-column col-5">
                            <div className="text-right col-12">
                                <a className="" style={{ fontSize: ".60rem" }}>
                                    2. กรณี Score ≥ 9 ส่งให้คณะกรรมการ ฯ พิจารณา
                                    และลงตรวจพื้นที่ปฎิบัติงาน
                                </a>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-left vertical-align-middle border-top-1 border-right-1 col-check  border-left-web border-right-mobile"
                                >
                                    <a className="" style={{ fontSize: '.55rem' }} >
                                        check
                                    </a>
                                </div>
                                <div
                                    className="text-left vertical-align-middle border-top-1 border-right-1 col-total  border-right-mobile"
                                >
                                    <a className="" style={{ fontSize: '.55rem' }} >
                                        Total Score (1 + 2)
                                    </a>
                                </div>
                                <div
                                    className="text-left vertical-align-middle border-top-1 col-total"
                                >
                                    <a className="" style={{ fontSize: '.55rem' }} >
                                        Reward (THB)
                                    </a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_15(e.checked)}
                                        checked={check_15}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 15</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">1000</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_12(e.checked)}
                                        checked={check_12}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 12</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">500</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_9(e.checked)}
                                        checked={check_9}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 9</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">200</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_7(e.checked)}
                                        checked={check_7}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 7</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">100</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_5(e.checked)}
                                        checked={check_5}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 5</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">40</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_3(e.checked)}
                                        checked={check_3}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile"
                                >
                                    <a className="text-xs">≥ 3</a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total"
                                >
                                    <a className="text-xs">20</a>
                                </div>
                            </div>
                            <div className='col-12-div-item flex-mobile padding-check'>
                                <div
                                    className="text-center border-top-1 border-right-1 border-left-web col-check border-right-mobile border-bottom-mobile"
                                >
                                    <Checkbox
                                        className="checkboxs"
                                        // onChange={(e) => setcheck_2(e.checked)}
                                        checked={check_15}
                                    ></Checkbox>
                                </div>
                                <div
                                    className="text-center border-top-1 border-right-1 col-total border-right-mobile border-bottom-mobile"
                                >
                                    <a className="text-xs"> {`<3`} </a>
                                </div>
                                <div
                                    className="text-center border-top-1 col-total border-bottom-mobile"
                                >
                                    <a className="text-xs">0</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Row 8 */}
                    <div className="test">
                        <div className='col-7'>
                            <div
                                className="text-left vertical-align-middle col-12"
                            >
                                <a className="" style={{ fontSize: ".75rem" }}>
                                    รายเซ็นต์ Manager : ……………………………………
                                </a>
                            </div>
                            <div
                                className="text-left vertical-align-middle col-12"
                            >
                                <a className="" style={{ fontSize: ".75rem" }}>
                                    รายเซ็นต์ Center : ………………………………………
                                </a>
                            </div>

                        </div>
                        <div className='col-5'>
                            <div className="text-left border-top-1 col-12">
                                <a className="text-xs font-bold">
                                    ความเห็นของ Leader of Kaizen Committee :
                                </a>
                            </div>
                            <div
                                className="text-left border-top-1 border-bottom-1 col-12"
                            >
                                <a className="font-bold" style={{ fontSize: ".58rem" }}>
                                    คะแนนรวม : …………………………. รางวัล : …………………………. THB
                                </a>
                            </div>
                        </div>

                    </div>
                    {/* Row 9 */}
                    {/* Row 10 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle col-12"
                        >
                            <a className=" font-bold" style={{ fontSize: "1rem" }}>
                                Criteria
                            </a>
                        </div>
                    </div>
                    {/* Row 10 */}

                    {/* Row 11 */}
                    <div className="flex-mobile ">
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-1 border-right-mobile col-2 test1"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                Score
                            </a>
                        </div>
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-1  border-right-mobile col-2 test1"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                4
                            </a>
                        </div>
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-1 border-right-mobile col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                3
                            </a>
                        </div>
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-1 border-right-mobile col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                2
                            </a>
                        </div>
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-1 border-right-mobile col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                1
                            </a>
                        </div>
                        <div
                            className="text-center font-bold vertical-align-middle border-top-1 border-right-mobile col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                0
                            </a>
                        </div>
                    </div>
                    {/* Row 11 */}
                    {/* Row 12 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  border-right-mobile col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                คุณภาพ(Quality)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 20,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 15,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 10,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 5,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 12 */}

                    {/* Row 13 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ต้นทุน(Cost)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 20,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 15,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 10,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ตั้งแต่ 5,000 บาท/เดือน
                            </a>
                        </div>
                        <div
                            className="vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 13 */}

                    {/* Row 14 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-mobile border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                การขนส่ง (Delivery)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle  border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุงและมีมาตรฐานในระบบ
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุงและมาตรฐาน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุง
                            </a>
                        </div>
                        <div
                            className="vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 14 */}

                    {/* Row 15 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ความปลอดภัย (Safety)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}> </h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุงและมาตรฐาน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุง
                            </a>
                        </div>
                        <div
                            className="text-center  vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 15 */}

                    {/* Row 16 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                สิ่งแวดล้อม(Environment)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุงและมาตรฐาน
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ปรับปรุง
                            </a>
                        </div>
                        <div
                            className="text-center  vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 16 */}

                    {/* Row 17 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ความคิดสร้างสรรค์(Idea)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ไม่เหมือนใคร & ดี
                            </a>
                        </div>
                        <div
                            className="text-center  vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 17 */}

                    {/* Row 18 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ความพยายาม (Effort)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ยาก & ดี
                            </a>
                        </div>
                        <div
                            className="text-center  vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 18 */}

                    {/* Row 19 */}
                    <div className="test">
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                ความยั่งยืน(Sustainability)
                            </a>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1  surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1 border-right-1 surface-400 col-2"
                        >
                            <h1 className="" style={{ fontSize: ".65rem" }}></h1>
                        </div>
                        <div
                            className="text-left vertical-align-middle border-top-1  border-right-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                มีมาตรฐานและอยู่ในระบบ
                            </a>
                        </div>
                        <div
                            className="text-center  vertical-align-middle border-top-1 col-2"
                        >
                            <a className="" style={{ fontSize: ".65rem" }}>
                                -
                            </a>
                        </div>
                    </div>
                    {/* Row 19 */}
                    {/* Row 20 */}
                    <div className="test">
                        <div
                            className="text-center vertical-align-middle border-top-1 col-12"
                        >
                            <a className="" style={{ fontSize: ".66rem" }}>
                                Q : คุณภาพ(Quality) C :ต้นทุน(Cost) D : การขนส่ง
                                (Delivery) S : ความปลอดภัย (Safety) E :
                                สิ่งแวดล้อม(Environment)
                            </a>
                        </div>
                    </div>
                    {/* Row 20 */}
                </div>
                {/* </Card> */}
                <br />
                <hr />

                <div className='flex flex-wrap justify-content-center gap-3'>

                    <Button size='small' style={{ height: '30px' }} severity="secondary" outlined >Draft</Button>

                    <Button size='small' style={{ height: '30px' }} severity="secondary" outlined onClick={saveKaizen}>Submit</Button>
                </div>
                {/* </form> */}
            </div>

        </>
    );
};

export default Dashboard;
