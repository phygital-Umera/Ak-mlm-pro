import React, {useState} from 'react';
import {ContactInfo} from '@/components/AdminSide/Register/ContactInfo';
import {LoginInfo} from '@/components/AdminSide/Register/LoginInfo';
import {SponserInfo} from '@/components/AdminSide/Register/SponserInfo';
import {SelectProduct} from '@/components/AdminSide/Register/SelectProduct';
import {useRegistration} from '@/context/RegisterContext';
// import {Personalnfo} from '@/components/AdminSide/Register/Personalnfo';

interface StepComponentProps {
  onNext: () => void;
}

const CustomerRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {data} = useRegistration();

  // Define all 4 steps
  const steps: {
    id: number;
    title: string;
    component: React.FC<StepComponentProps>;
  }[] = [
    {id: 1, title: 'Sponsor Info', component: SponserInfo},
    {id: 2, title: 'Select Product', component: SelectProduct},
    {id: 3, title: 'Contact Info', component: ContactInfo},
    {id: 4, title: 'Login Info', component: LoginInfo},
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    // Don't show alert here - LoginInfo will handle submission
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="mx-auto max-w-270">
      {/* Stepper Header */}
      <div className="mb-6">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-1/5 p-2 text-center ${
                currentStep === index
                  ? 'font-bold text-blue-500'
                  : 'text-gray-400'
              }`}
            >
              {step.id}
              <div>{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <CurrentComponent onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
