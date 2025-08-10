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
import Sucsses from "@/components/Sucsses";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);

  const [showThankYou, setShowThankYou] = useState(false);

  // رقم الواتساب الذي سيتم إرسال البيانات إليه
  const whatsappNumber = "201553841793"; // قم بتغيير هذا الرقم برقمك

  const isValidStep1 = name.trim() !== "" && /^01\d{9}$/.test(phone);
  const isValidStep2 = true;
  const isValidStep3 = !!selectedPlan;

  function isStepValid(step) {
    switch (step) {
      case 1:
        return isValidStep1;
      case 2:
        return isValidStep2;
      case 3:
        return isValidStep3;

      default:
        return true;
    }
  }

  const sendWhatsAppMessage = async (message) => {
    try {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // فتح الواتساب في نافذة جديدة
      window.open(whatsappUrl, "_blank");

      return true;
    } catch (error) {
      console.error("WhatsApp send error:", error);
      return false;
    }
  };

  const sendFinalWhatsApp = async () => {
    const planNames = {
      first: "استضافه موقع",
      second: "تصميم موقع",
      third: "برمجه موقع",
      fourth: "تصميم واستضافه وبرمجه موقع",
    };

    const message = `🎉 طلب جديد مكتمل!

📋 تفاصيل الطلب:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 الاسم: ${name}
 رقم الهاتف: ${phone}
 اسم الموقع: ${email}
 الباقة المختارة: ${planNames[selectedPlan] || selectedPlan}

━━━━━━━━━━━━━━━━━━━━━━━━`;

    await sendWhatsAppMessage(message);
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
              setCurrentStep(step);
            }}
            onFinalStepCompleted={() => {
              sendFinalWhatsApp();
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
                ادخل اسم الموقع الذى ترغب فى حجزه
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
                    تصميم واستضافه وبرمجه موقع
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
            </Step>
          </Stepper>
        </>
      )}
    </div>
  );
}
