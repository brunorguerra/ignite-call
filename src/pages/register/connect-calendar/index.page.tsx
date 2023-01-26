import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";

import * as S from "./styles";
import { Container, Header } from "../styles";

export default function ConnectCalendar() {
    const session = useSession();
    const router = useRouter();

    const hasAuthError =
        !!router.query.error && session.status === "unauthenticated";
    const isSignedIn = session.status === "authenticated";

    async function handleConnectCalendar() {
        await signIn("google");
    }

    async function handleNavigateToNextStep() {
        await router.push("/register/time-intervals");
    }

    return (
        <Container>
            <Header>
                <Heading as="strong">Conecte sua agenda!</Heading>
                <Text>
                    Conecte o seu calendário para verificar automaticamente as
                    horas ocupadas e os novos eventos à medida em que são
                    agendados.
                </Text>

                <MultiStep size={4} currentStep={2} />
            </Header>

            <S.ConnectBox>
                <S.ConnectItem>
                    <Text>Google Agenda</Text>

                    {isSignedIn ? (
                        <Button size="sm" disabled={isSignedIn}>
                            Conectado <Check />
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleConnectCalendar}
                        >
                            Conectar <ArrowRight />
                        </Button>
                    )}
                </S.ConnectItem>

                {hasAuthError && (
                    <S.AuthError size="sm">
                        Falha ao se conectar ao Google, verifique se você
                        habilitou as permissões de acesso ao Google Calendar.
                    </S.AuthError>
                )}

                <Button
                    type="submit"
                    disabled={!isSignedIn}
                    onClick={handleNavigateToNextStep}
                >
                    Próximo passo <ArrowRight />
                </Button>
            </S.ConnectBox>
        </Container>
    );
}
