import FormSection from "../organism/formSection";
import InputForm from "../molecules/inputForm";
import { Title } from "../atoms/title";
import { loginForm } from "@/const/Form";
export default function LoginPage() {
  return (
    <div className="flex w-full p-4 md:p-2 xl:p-3 h-dvh bg-bone">
      <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center  md:mr-1.5">
        <Title textAs="a" textProps={{href:"/"}} textSize="heading2" textFamily="lily" title="Opak Kopi" className="absolute top-0 left-0" />
        <FormSection buttonText="Masuk" className="w-[16rem] xs:w-[20rem] sm:w-[23rem] md:w-[18rem] lg:w-[22rem] xl:w-[25rem] 2xl:w-[28.7rem]" gapForm="xs" gap="sm" login={true} textProps={{
            as:"a",
            href:"/forgot-password",
            size:"caption",
            children:"Lupa Kata Sandi?",
            position:"right",
            className:"hover:cursor-pointer",
        }}>
          {loginForm.map((item) => (
            <InputForm
              key={item.id}
              inputId={item.inputId}
              children={item.children}
              labelSize="default"
              inputVariant={item.variant}
              inputProps={{
                placeholder: item.placeHolder,
              }}
            />
          ))}
        </FormSection>
      </div>
      <div className="hidden md:block w-1/2 md:ml-1.5 bg-[url('/image/Header.png')] bg-cover bg-center rounded-2xl"></div>
    </div>
  );
}
