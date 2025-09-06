/* eslint-disable */
import React from 'react';
import {useAuthContext} from '@/context/AuthContext';

const WlcmLetter: React.FC = () => {
  const {user} = useAuthContext(); // get logged-in user
  console.log('user', user);

  if (!user) return <p className="py-8 text-center">No user data found</p>;

  return (
    <div
      style={{
        width: '700px',
        margin: '20px auto',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
      }}
    >
      {/* Background Image */}
      <img
        src="https://npspension.co.in/MemberPanel/images/welcome.jpg"
        alt="welcome"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Overlay Content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo in center top */}
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <h5 className="mt-24 font-[Cambria] text-3xl text-[#1f7ca7]">
            SJC Group
          </h5>
          <p style={{margin: '5px 0', fontSize: '14px'}}>
            www.scjgroupconsultant.co.in
          </p>
        </div>

        {/* Title */}
        <h2
          style={{
            color: '#e6860a',
            textAlign: 'center',
            margin: '20px 0',
          }}
        >
          Congratulations
        </h2>

        {/* Name + ID */}
        <div
          style={{textAlign: 'center', fontSize: '16px', marginBottom: '20px'}}
        >
          <p>
            <strong style={{color: 'black'}}>Name:</strong> {user.fullname}
          </p>
          {/* <p>
            <strong style={{color: 'black'}}>ID:</strong> {user.crnNo}
          </p> */}
        </div>

        {/* Letter Body */}
        <div
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            textAlign: 'justify',
            color: '#000',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <p>
            Welcome to be a proud member of{' '}
            <strong style={{color: '#e6860a'}}>SCJ Group Consultant</strong>. We
            really appreciate your faith in us. At{' '}
            <strong style={{color: '#e6860a'}}>SCJ Group Consultant</strong> you
            will now realise that dreams are not that difficult and success is
            within your sight. You are now a part of the opportunity of the
            millennium.
          </p>

          <p>
            <strong style={{color: '#e6860a'}}>SCJ Group Consultant</strong> is
            an exciting "People Business". A business that has the potential to
            turn your dreams into reality. As you build your business, you will
            establish lifelong friendships and develop support systems
            unparalleled in any other business.
          </p>

          <p>
            We are confident that you will receive gratification from your
            involvement with{' '}
            <strong style={{color: '#e6860a'}}>SCJ Group Consultant </strong>{' '}
            and we wish you every success!
          </p>

          <p>
            Please note we are providing you an opportunity to earn money which
            is optional, your earnings will depend directly on the amount of
            effort you put to develop your business. For further details login
            on{' '}
            <strong style={{color: '#e6860a'}}>
              www.scjgroupconsultant.co.in
            </strong>{' '}
            with your userid and password.
          </p>
        </div>

        {/* Signature */}
        <div style={{marginTop: '30px', textAlign: 'right'}}>
          <h4 style={{margin: '0', fontSize: '16px'}}>Regards</h4>
          <h3
            style={{color: '#e6860a', fontWeight: 'bold', margin: '5px 0 0 0', fontSize: '16px'}}
          >
            SCJ Group Consultant
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WlcmLetter;
