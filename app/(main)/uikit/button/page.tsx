'use client';
import React, { useState, useEffect } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import styles from './index.module.scss';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Demo } from '../../../../types/types';
import { Sidebar } from 'primereact/sidebar';
import '../../page2.css';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
const ButtonDemo = () => {
    const emptyForm = {
        id: null,
        user_login: "",
        date_createby: null,
        title: null,
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
    };
    const [getId, setgetId]: any = useState('');
    const [dataKaizen, setdataKaizen]: any = useState<Demo.Product[]>();
    const [stepNow, setstepNow]: any = useState<Demo.Product[]>();
    const [namekaizen, setnamekaizen] = useState('');
    const [loading2, setLoading2] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [metaKey, setMetaKey] = useState(true);
    const [visibleRight, setVisibleRight] = useState(false);
    // const getData_step_1 = () => {

    // useEffect(() => {
    //     window.addEventListener("message", function (event) {
    //         if (event.origin === 'http://localhost:9900/uikit/button') {
    //             console.log(event);
    //         } else {
    //             return;
    //         }
    //     }, false);
    // }, []);

    useEffect(() => {

        const formgetid: any = new FormData();
        formgetid.append('getSession', 'getSession');
        const requestOptions = {
            method: "post",
            headers: {
                accept: "application/json",
            },
        };
        fetch("https://kpi.vandapac.com/api_em_number_user", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log(localStorage.getItem('em_id2'));
                setgetId(data.user_id)
                localStorage.setItem('Em_id', data.user_id)
            });
    }, [])
    // console.log(sessionStorage.getItem('number'));

    useEffect(() => {
        setLoading2(true);
        const formgetDataStep_1: any = new FormData();
        formgetDataStep_1.append('employee_number', getId);
        const requestOptions = {
            method: "post",
            headers: { accept: "application/json" },
            body: formgetDataStep_1,
        };
        fetch("http://localhost:8000/api/get_datastep_1", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setdataKaizen(data),
                    setLoading2(false),
                    setnamekaizen(data.title)
            });

        const formgetStep: any = new FormData();
        formgetStep.append('employee_number', getId);
        const requeststepNow = {
            method: "post",
            headers: { accept: "application/json" },
            body: formgetStep,
        };
        fetch("http://localhost:8000/api/getstepNow", requeststepNow)
            .then((response) => response.json())
            .then((data) => {
                setstepNow(data)
            });
    }, [getId])
    const Overview = () => {
        console.log(selectedProduct)
        if (selectedProduct !== null) {
            const getIdformat: any = new FormData();
            getIdformat.append('dataID', selectedProduct);
            window.location.replace('/');
        }
    }
    const CreateForm = () => {
        localStorage.setItem('dataID', 'null');
        window.location.replace('/');
    }

    const DeleteData = () => {
        const formID: any = new FormData();
        formID.append('deleteID', selectedProduct);
        const requestOptions = {
            method: "POST",
            headers: { accept: "application/json" },
            body: formID,
        };
        fetch("http://localhost:8000/api/deleteForm", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const formgetDataStep_1: any = new FormData();
                formgetDataStep_1.append('employee_number', getId);
                const requestOptions = {
                    method: "post",
                    headers: { accept: "application/json" },
                    body: formgetDataStep_1,
                };
                fetch("http://localhost:8000/api/get_datastep_1", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        setdataKaizen(data),
                            setLoading2(false),
                            setnamekaizen(data.title)
                        // sessionStorage.setItem('dataID',)
                        // console.log(data)
                    });
            })
    }
    return (
        <>
            {/* <div className='flex align-items-center justify-content-center'>
                                        <h5>{dataKaizen[d]?.title}</h5>
                                    </div>
                                    <div className='flex align-items-center justify-content-center'>
                                        <a href="https://kpi.vandapac.com" target="" rel="noreferrer">
                                            <Button>Click</Button>
                                        </a>
                                    </div> */}
            <div className='flex-column'>

                <div className="grid m-3 flex  justify-content-end">
                    <span>
                        <Button icon="pi pi-bell" rounded outlined severity="warning" aria-label="Notification" onClick={() => setVisibleRight(true)} style={{ marginRight: '.25em' }} />
                        <Badge className='badgeset' value="3" severity="danger"></Badge>
                    </span>
                    <Sidebar visible={visibleRight} onHide={() => setVisibleRight(false)} baseZIndex={1000} position="right">
                        <h3 style={{ fontWeight: 'normal' }}>Order</h3>
                        <hr />
                        {stepNow &&
                            Object.keys(stepNow).map((index: any, i) => (
                                <>
                                    <div style={{ cursor: 'pointer' }} className='flex flex-warp justify-content-between surface-section hover:surface-300'>
                                        <div className='flex-column'>
                                            <div><h6>{stepNow[index].title}</h6></div>
                                            <div><a style={{ fontSize: '11px', margin: '0px' }}>{stepNow[index]?.createby}</a></div>
                                        </div>
                                        <div className='flex-column'>
                                            <div><h6>{stepNow[index]?.date_createby}</h6></div>
                                            <div><a style={{ fontSize: '11px', margin: '0px' }}>{stepNow[index]?.employee_number}</a></div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            ))
                        }

                    </Sidebar>
                </div>
                <div className="grid m-3">
                    <div className="border-1 col-12 flex flex-warp gap-3" >
                        <div className='col-7 flex flex-warp gap-3'>
                            <div className=''>
                                {/* <span className="block text-500 font-medium mb-3">Open</span> */}
                                <Button label="Open" severity="secondary" size="small" raised onClick={Overview} />
                            </div>
                            <div className=''>
                                {/* <span className="block text-500 font-medium mb-3">New Kaizen</span> */}
                                <Button label="Delete" severity="secondary" size="small" raised onClick={DeleteData} />
                            </div>
                            <div className=''>
                                {/* <span className="block text-500 font-medium mb-3">New Kaizen</span> */}
                                <Button label="Cancel" severity="secondary" size="small" raised />
                            </div>
                            <div className=''>
                                {/* <span className="block text-500 font-medium mb-3">New Kaizen</span> */}
                                <Button label="Print" severity="secondary" size="small" raised />
                            </div>
                        </div>
                        <div className='flex justify-content-end col-5 pr-4'>
                            {/* <span className="block text-500 font-medium mb-3">New Kaizen</span> */}
                            <Button label="Create" severity="secondary" size="small" onClick={CreateForm} raised />
                        </div>
                    </div>
                </div>
                <div className="grid m-3">
                    <div className="border-1 col-12-news border-round-top" >
                        <div className='surface-500 border-round-top p-1'>
                            <h5 className='text-50  vertical-align-middle'>Kaizen List</h5>
                        </div>
                        <div className="card" >

                            <DataTable value={dataKaizen} rows={5} paginator loading={loading2} selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => { setSelectedProduct(e.value.id), localStorage.setItem('dataID', e.value.id) }} dataKey="id" metaKeySelection={metaKey} tableStyle={{ minWidth: '94.5rem' }}>
                                <Column field="title" header="Title" sortable />
                                <Column field="createby" header="Create By" sortable />
                                <Column field="date_createby" header="DateCreate" sortable />
                                <Column field="division" header="Division" sortable />
                                <Column field="st_name" header="Status" sortable />
                            </DataTable>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default ButtonDemo;
