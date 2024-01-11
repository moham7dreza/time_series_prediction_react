import {useContext, useEffect} from "react";
import {useFetch} from "../customHooks/useFetch";
import {StockContext} from "../context/StockContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
// import {PredictValidation} from "../validations/PredictValidation";
import Datepicker from "react-tailwindcss-datepicker";
import {Spinner} from "./Spinner";
import * as YUP from "yup";
import {Helmet} from "react-helmet-async";

export const DatasetPropsForm = () => {
    const {
        submitDatasets, date, handleDateChange, loading, datasets, setDatasets, prices, setPrices
    } = useContext(StockContext)

    const [datasetNames] = useFetch('http://127.0.0.1:5000/datasets-name')
    const [pricesNames] = useFetch('http://127.0.0.1:5000/prices-name')

    useEffect(() => {
        if (datasetNames && datasetNames.status === 'OK') {
            // toast.success('Dataset names fetched')
            setDatasets(datasetNames.data)
        }
        if (pricesNames && pricesNames.status === 'OK') {
            // toast.info('series names fetched')
            setPrices(pricesNames.data)
        }
    }, [datasetNames, pricesNames])

    const validation = YUP.object().shape({
        // n_steps: YUP.number().required('Number of Time Steps is required'),
        // ...series.reduce((acc, serie) => {
        //     acc[`serie-${serie}`] = YUP.boolean().required(`${serie} is required`);
        //     return acc;
        // }, {}),
        // ...models.reduce((acc, model) => {
        //     acc[`model-${model}`] = YUP.boolean().required(`${model} is required`);
        //     return acc;
        // }, {}),
        // ...datasets.reduce((acc, dataset) => {
        //     acc[`dataset-${dataset}`] = YUP.boolean().required(`${dataset} is required`);
        //     return acc;
        // }, {}),
    })
    //     .test('atLeastOneChecked', 'At least one checkbox must be selected', values => {
    //     return (
    //         datasets.some(dataset => values[`dataset-${dataset}`]) &&
    //         series.some(serie => values[`serie-${serie}`]) &&
    //         models.some(model => values[`model-${model}`])
    //     );
    // });

    const initialValues = {
        ...datasets.reduce((acc, dataset) => {
            acc[`dataset-${dataset}`] = false;
            return acc;
        }, {}),
        ...prices.reduce((acc, price) => {
            acc[`price-${price}`] = false;
            return acc;
        }, {}),
    };


    return (
        <>
            <Helmet>
                <title>Dataset Props</title>
            </Helmet>
            {loading ? <Spinner/> : <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto rounded-2xl shadow-2xl mt-5">
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => submitDatasets(values)} validationSchema={validation}>
                    <Form>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-800 dark:text-gray-300 dark:hover:text-white">Dataset
                                    Properties</h2>

                                <section className="flex space-x-20 space-y-12">

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                Datasets
                                                ...
                                            </legend>
                                            <div className="mt-6 space-y-6">
                                                {datasets.map((dataset, index) => (
                                                    <div className="relative flex gap-x-3" key={index}>
                                                        <div className="flex h-6 items-center">
                                                            <Field name={`dataset-${dataset}`} id={`dataset-${dataset}`}
                                                                   type="checkbox"
                                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor={`dataset-${dataset}`}
                                                                   className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{dataset}</label>
                                                            <ErrorMessage name={`dataset-${dataset}`}>
                                                                {message => (<div
                                                                    className={'text-red-500 my-2'}>{message}</div>)}
                                                            </ErrorMessage>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                Prices
                                                ...
                                            </legend>
                                            <div className="mt-6 space-y-6">
                                                {prices.map((price, index) => (
                                                    <div className="relative flex gap-x-3" key={index}>
                                                        <div className="flex h-6 items-center">
                                                            <Field name={`price-${price}`} id={`price-${price}`}
                                                                   type="checkbox"
                                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor={`price-${price}`}
                                                                   className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{price}</label>
                                                            <ErrorMessage name={`price-${price}`}>
                                                                {message => (<div
                                                                    className={'text-red-500 my-2'}>{message}</div>)}
                                                            </ErrorMessage>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mt-10 border-b border-gray-900/10 pb-12">
                                        <legend className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Enter props
                                            ...
                                        </legend>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-12">
                                                <Datepicker
                                                    value={date}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            {/*<button type="button" className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Cancel</button>*/}
                            <button type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>}
        </>
    )
        ;
};