import * as S from "./styles";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const registerFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O usuário precisa ter pelo menos 3 letras." })
        .regex(/^([a-z\\-]+)$/i, {
            message: "O usuário pode ter apenas letras e hifens",
        })
        .transform((username) => username.toLowerCase()),
    name: z
        .string()
        .min(3, { message: "O nome precisa ter pelo menos 3 letras." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    });

    async function handleRegister(data: RegisterFormData) {
        console.log(data);
    }

    useEffect(() => {
        if (router.query.username) {
            setValue("username", String(router.query.username));
        }
    }, [router.query.username, setValue]);

    return (
        <S.Container>
            <S.Header>
                <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah,
                    você pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </S.Header>

            <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput
                        prefix="ignite.com/"
                        placeholder="seu-usuario"
                        {...register("username")}
                    />

                    {errors.username && (
                        <S.FormError size="sm">
                            {errors.username.message}
                        </S.FormError>
                    )}
                </label>

                <label>
                    <Text size="sm">Nome de completo</Text>
                    <TextInput placeholder="Seu nome" {...register("name")} />

                    {errors.name && (
                        <S.FormError size="sm">
                            {errors.name.message}
                        </S.FormError>
                    )}
                </label>

                <Button type="submit">
                    Próximo passo <ArrowRight />
                </Button>
            </S.Form>
        </S.Container>
    );
}
