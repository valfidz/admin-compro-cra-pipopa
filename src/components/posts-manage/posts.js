export const Post = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <main className="mt-10">
                    <div 
                        className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative h-96"
                    >
                        <div 
                            className="absolute left-0 bottom-0 w-full h-full z-10"
                            style={{
                                backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))'
                            }}
                        />
                        <img 
                            src="/api/placeholder/2100/800"
                            alt="Featured post image"
                            className="absolute left-0 top-0 w-full h-full z-0 object-cover" 
                        />
                        <div className="p-4 absolute bottom-0 left-0 z-20">
                            <a href="#"
                                className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                                Nutrition
                            </a>
                            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                                Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales, massa et auctor.
                            </h2>
                            <div className="flex mt-3">
                                <img 
                                    src="/api/placeholder/100/100"
                                    alt="Author profile"
                                    className="h-10 w-10 rounded-full mr-2 object-cover" 
                                />
                                <div>
                                    <p className="font-semibold text-gray-200 text-sm"> Mike Sullivan </p>
                                    <p className="font-semibold text-gray-400 text-xs"> 14 Aug </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                        <p className="pb-6">Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is
                        justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an. She projection advantages
                        resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was
                        outlived peculiar rendered led six.</p>

                        <p className="pb-6">Difficulty on insensible reasonable in. From as went he they. Preference themselves me as
                        thoroughly partiality considered on in estimating. Middletons acceptance discovered projecting so is so or. In or
                        attachment inquietude remarkably comparison at an. Is surrounded prosperous stimulated am me discretion
                        expression. But truth being state can she china widow. Occasional preference fat remarkably now projecting
                        uncommonly dissimilar. Sentiments projection particular companions interested do at my delightful. Listening
                        newspaper in advantage frankness to concluded unwilling.</p>

                        <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
                            Sportsman do offending supported extremity breakfast by listening. Decisively advantages nor
                            expression unpleasing she led met. Estate was tended ten boy nearer seemed. As so seeing latter he should thirty whence.
                            Steepest speaking up attended it as. Made neat an on be gave show snug tore.
                        </div>

                        <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">Uneasy barton seeing remark happen his has</h2>

                        <p className="pb-6">Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown
                        oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested
                        simplicity at do projecting increasing terminated. As edward settle limits at in.</p>

                        <p className="pb-6">Dashwood contempt on mr unlocked resolved provided of of. Stanhill wondered it it welcomed oh.
                        Hundred no prudent he however smiling at an offence. If earnestly extremity he he propriety something admitting convinced
                        ye. Pleasant in to although as if differed horrible. Mirth his quick its set front enjoy hoped had there. Who
                        connection imprudence middletons too but increasing celebrated principles joy.</p>
                    </div>
                </main>
            </div>
        </>
    )
}