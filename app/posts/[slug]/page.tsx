import { graphql } from "../../../gql";
import { graphqlClient } from "../../../lib/graphql-client";

export const revalidate = 3600;

const GetPostBySlugDocument = graphql(/* GraphQL */ `
  query GetPostBySlug($slug: String!) {
    post(by: { slug: $slug }) {
      id
      title
      slug
    }
  }
`);

const Page = async ({ params }: { params: { slug: string } }) => {
  const { post } = await graphqlClient.request(GetPostBySlugDocument, {
    slug: params.slug,
  });

  if (!post) {
    return <h1>404</h1>;
  }

  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

export default Page;
