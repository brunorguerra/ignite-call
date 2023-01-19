import * as S from "./styles";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O usuário precisa ter pelo menos 3 letras." })
        .regex(/^([a-z\\-]+)$/i, {
            message: "O usuário pode ter apenas letras e hifens",
        })
        .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export const ClaimUsernameForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    });

    async function handleClaimUsername({ username }: ClaimUsernameFormData) {
        await router.push({
            pathname: "/register",
            query: { username },
        });
    }

    return (
        <>
            <S.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    size="sm"
                    prefix="ignite.com/"
                    placeholder="seu-usuário"
                    {...register("username")}
                />

                <Button size="sm" type="submit" disabled={isSubmitting}>
                    Reservar usuário <ArrowRight />
                </Button>
            </S.Form>

            <S.FormAnnotation>
                <Text size="sm">
                    {errors.username
                        ? errors.username.message
                        : "Digite o nome do usuário desejado!"}
                </Text>
            </S.FormAnnotation>
        </>
    );
};
