import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

// const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ResetPasswordEmail = ({
  resetPasswordLink,
}: {
  resetPasswordLink: string;
}) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="Inter"
            fallbackFontFamily="Helvetica"
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Le Foot - Mise à jour du mot de passe</Preview>
        <Body className="bg-gray-100 py-2.5">
          <Container className="bg-white border border-gray-200 p-11">
            <Section className="flex justify-center items-center p-8">
              <Img
                src={`${baseUrl}/lefoot_round-light.png`}
                width="120"
                height="120"
                alt="Le Foot"
              />
            </Section>
            <Section>
              <Text className="text-base font-light text-gray-800 leading-6.5">
                Salut cher footeux·se !
              </Text>
              <Text className="text-base font-light text-gray-800 leading-6.5">
                Une requête de mise à jour de ton mot de passe Le Foot a été
                envoyée. Si cela vient bien de toi, tu peux configurer ton mot
                de passe en cliquant sur le bouton suivant :
              </Text>
              <Button
                className="bg-blue-600 rounded text-white font-sans text-sm no-underline text-center block w-52 py-3.5 mx-auto"
                href={resetPasswordLink}
              >
                Configurer mon mot de passe
              </Button>
              <Text className="text-base font-light text-gray-800 leading-6.5">
                Si cette requête ne vient pas de toi, ou que tu ne veux pas
                changer ton mot de passe, ignore simplement ce message.
              </Text>
              <Text className="text-base font-light text-gray-800 leading-6.5">
                {`Pour garder ton compte sécurisé, ne transfère pas ce mail à quelqu'un.`}
              </Text>
              <Text className="text-base font-light text-gray-800 leading-6.5 mt-8">
                A bientôt sur Le Foot !
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ResetPasswordEmail;
