import React from 'react';
import SignupForm from "../../../components/auth-form/signup/SignupForm";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <Head>
                <title>Create an Account</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SignupForm />
        </>
    );
};

export default Index;