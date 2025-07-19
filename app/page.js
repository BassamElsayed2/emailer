"use client";

import { useEffect, useState } from "react";
import Stepper, { Step } from "@/components/StepperUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import emailjs from "emailjs-com";
import Sucsses from "@/components/Sucsses";

const moneyMethods = [
  { id: "wistreen", label: "ويسترن يونيون", icon: "/icons/wistreen.png" },
  { id: "orange", label: "أورانج موني", icon: "/icons/orange.png" },
  { id: "vodafone", label: "فودافون كاش", icon: "/icons/vodafone.png" },
  {
    id: "visa",
    label: "الدفع بواسطة فيزا او ماستر كارت",
    icon: "/icons/visa.webp",
  },
  { id: "cib", label: "البنك التجاري الدولي", icon: "/icons/cib.png" },
];

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [emailSent, setEmailSent] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const planPrices = {
    first: 2000,
    second: 2500,
    third: 3000,
    fourth: 5000,
  };
  const [price, setPrice] = useState(0);

  const isValidStep1 = name.trim() !== "" && /^01\d{9}$/.test(phone);
  const isValidStep2 = true;
  const isValidStep3 = !!selectedPlan;
  const isValidStep4 = !!selectedMethod;

  useEffect(() => {
    if (selectedPlan) setPrice(planPrices[selectedPlan]);
  }, [selectedPlan]);

  function isStepValid(step) {
    switch (step) {
      case 1:
        return isValidStep1;
      case 2:
        return isValidStep2;
      case 3:
        return isValidStep3;
      case 4:
        return isValidStep4;
      default:
        return true;
    }
  }

  const sendEmail = async () => {
    try {
      const result = await emailjs.send(
        "service_hktbakp",
        "template_1aznsr4",
        {
          name,
          phone,
        },
        "1uWgr3JfYLcUC77HT"
      );
      console.log("Email sent:", result.text);
      setEmailSent(true);
    } catch (error) {
      console.error("Email send error:", error);
    }
  };

  const sendFinalEmail = async () => {
    try {
      const result = await emailjs.send(
        "service_hktbakp",
        "template_ilaak5a",
        {
          name,
          phone,
          domain: email,
          plan: selectedPlan,
          method: selectedMethod,
          price: `${price} جنيه`,
        },
        "1uWgr3JfYLcUC77HT"
      );
      console.log("✅ Final email sent:", result.text);
    } catch (error) {
      console.error("❌ Final email error:", error);
    }
  };

  return (
    <div className="min-h-[100vh]">
      {showThankYou ? (
        <Sucsses />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center p-4 mt-10">
            <h2 className="text-2xl font-bold">بخطوات بسيطة وسهله</h2>

            <p className="text-sm"> إحصل على موقعك الان ! </p>

            <p className="text-sm w-[400px] text-center mt-4">
              يرجي تعبئة البيانات التاليه لطلب الخدمه
            </p>
          </div>
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              if (step === 2 && isValidStep1 && !emailSent) {
                sendEmail();
              }
              setCurrentStep(step);
            }}
            onFinalStepCompleted={() => {
              sendFinalEmail();
              setShowThankYou(true);
              console.log("All steps completed!");
            }}
            backButtonText="السابق"
            nextButtonText="التالي"
            nextButtonProps={{
              disabled: !isStepValid(currentStep),
              style: !isStepValid(currentStep)
                ? { opacity: 0.5, cursor: "not-allowed" }
                : {},
            }}
            disableStepIndicators={true}
          >
            <Step>
              <h2 className="text-2xl font-bold mb-4">بينات طالب الخدمة</h2>
              <Label htmlFor="name" className="mb-2 font-semibold text-lg">
                الاسم :
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ادخل الاسم"
                className="mb-4 "
              />
              <Label htmlFor="phone" className="mb-2 font-semibold text-lg">
                الرقم : *
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="01000000000"
                className="mb-2"
              />
              {!isValidStep1 && (
                <p className="text-yellow-500 text-sm">
                  يرجى إدخال اسم ورقم صحيح يبدأ بـ 01 ويتكون من 11 رقم
                </p>
              )}
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4">
                ادخل اسم الموقع الذى ترغب فى حجزه
              </h2>
              <Label htmlFor="email" className="mb-2 text-lg">
                اسم الموقع
              </Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="www.companyName.com/net"
                className="mb-10"
              />

              <h2 className="text-xl">اختار الباقة المناسبة لك:</h2>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر باقة" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="first"> استضافه موقع</SelectItem>
                  <SelectItem value="second"> تصميم موقع</SelectItem>
                  <SelectItem value="third"> برمجه موقع</SelectItem>
                  <SelectItem value="fourth">
                    تصميم واستضافه وبرمجه موقع
                  </SelectItem>
                </SelectContent>
              </Select>
              {!isValidStep3 && (
                <p className="text-yellow-500 text-sm">يجب اختيار باقة</p>
              )}
              <h3 className="text-xl font-bold mt-10">
                جميع الباقات تشمل على:
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>لوحة تحكم سهلة</li>
                <li>اسم نطاق - دومين</li>
                <li>سيرفرات سحابية</li>
                <li>سرعات فائقة للإرسال أو الاستقبال</li>
                <li>نسخ احتياطي</li>
                <li>دعم فني</li>
              </ul>
              {selectedPlan === "" ? (
                ""
              ) : (
                <h2 className="text-lg font-bold mt-10">
                  سعر الباقة: {price} جنيه
                </h2>
              )}
            </Step>
            {/* <Step>
              <h2>اختار الباقة المناسبة لك:</h2>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر باقة" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="first"> استضافه موقع</SelectItem>
                  <SelectItem value="second"> تصميم موقع</SelectItem>
                  <SelectItem value="third"> برمجه موقع</SelectItem>
                  <SelectItem value="fourth">
                    تصميم واستضافه وبرمجه موقع
                  </SelectItem>
                </SelectContent>
              </Select>
              {!isValidStep3 && (
                <p className="text-yellow-500 text-sm">يجب اختيار باقة</p>
              )}
              <h3 className="text-lg font-bold mt-10">
                جميع الباقات تشمل على:
              </h3>
              <ul className="list-disc list-inside">
                <li>لوحة تحكم سهلة</li>
                <li>اسم نطاق - دومين</li>
                <li>سيرفرات سحابية</li>
                <li>سرعات فائقة للإرسال أو الاستقبال</li>
                <li>نسخ احتياطي</li>
                <li>دعم فني</li>
              </ul>
              {selectedPlan === "" ? (
                ""
              ) : (
                <h2 className="text-lg font-bold mt-10">
                  سعر الباقة: {price} جنيه
                </h2>
              )}
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-center">
                اختر طريقة الدفع المناسبة
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {moneyMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`border rounded-xl p-4 flex flex-col items-center shadow-sm transition-all ${
                      selectedMethod === method.id
                        ? "border-blue-600 ring-2 ring-blue-300"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={method.icon}
                      alt={method.label}
                      className="h-12 mb-3"
                    />
                    <p className="text-center text-sm font-medium">
                      {method.label}
                    </p>
                  </button>
                ))}
              </div>
              {!isValidStep4 && (
                <p className="text-yellow-500 text-sm text-center mt-4">
                  يجب اختيار طريقة دفع
                </p>
              )}
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-center">
                تأكيد الدفع
              </h2>
              <p className="text-center">الاسم: {name}</p>
              <p className="text-center">رقم الهاتف: {phone}</p>
              <p className="text-center">الدومين: {email}</p>
              <p className="text-center">الباقة: {selectedPlan}</p>
              <p className="text-center">طريقة الدفع: {selectedMethod}</p>
              <p className="text-center font-bold mt-4">
                المجموع: {price} جنيه
              </p>
            </Step> */}
          </Stepper>
        </>
      )}
    </div>
  );
}
