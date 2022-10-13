// import { Resolver, Args, Mutation } from '@nestjs/graphql'
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
// import type { FileUpload } from 'graphql-upload/processRequest.js'
// import { createWriteStream } from 'fs'

// @Resolver()
// export class FileResolver {
//   constructor() {}

//   @Mutation(() => Boolean)
//   async uploadFile(
//     @Args({ name: 'file', type: () => GraphQLUpload })
//     { createReadStream, filename }: FileUpload
//   ): Promise<boolean> {
//     return new Promise(async (resolve, reject) =>
//       createReadStream()
//         .pipe(createWriteStream(`./uploads/${filename}`))
//         .on('finish', () => resolve(true))
//         .on('error', () => reject(false))
//     )
//   }
// }
