import asyncio
import concurrent.futures
import os
import re
import sys
from typing import Dict, Any, List

import aioconsole
import openai
from langchain_core.callbacks import BaseCallbackHandler, AsyncCallbackHandler
from langchain_core.output_parsers import StrOutputParser
from langchain_core.outputs import LLMResult
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from openai_api_test.repository.openai_api_test_repository import OpenAIAPIRepository
from template.utility.color_print import ColorPrinter

openai.api_key = os.getenv("OPENAI_API_KEY")


class MyCustomAsyncHandler(AsyncCallbackHandler):
    """Async callback handler that can be used to handle callbacks from langchain."""

    async def on_llm_start(
            self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        """Run when chain starts running."""
        print("zzzz....")
        await asyncio.sleep(0.1)
        print("Hi! I just woke up. Your llm is starting")

    async def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        """Run when chain ends running."""
        print("zzzz....")
        await asyncio.sleep(0.1)
        print("Hi! I just woke up. Your llm is ending")

class OpenAIAPIRepositoryImpl(OpenAIAPIRepository):
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)

        return cls.__instance

    @classmethod
    def getInstance(cls):
        if cls.__instance is None:
            cls.__instance = cls()

        return cls.__instance

    async def get_stdin_reader(self) -> asyncio.StreamReader:
        stream_reader = asyncio.StreamReader()
        protocol = asyncio.StreamReaderProtocol(stream_reader)
        loop = asyncio.get_running_loop()
        await loop.connect_read_pipe(lambda: protocol, sys.stdin)
        return stream_reader

    async def generateBacklogText(self, codeText):
        llm = ChatOpenAI(temperature=0.1, model_name="gpt-4o-mini", callbacks=[MyCustomAsyncHandler()])

        template = f"""
        아래 소스코드는 내가 진행한 프로젝트의 전체 소스 코드를 하나의 텍스트로 연결한 파일이야.
        코드: {codeText}
        이 소스코드를 기반으로, 프로젝트 결과 보고서를 만들어줬으면 좋겠어.
        각 항목들 이름은 @로 시작하고 @로 끝나도록 작성해서, 해당 내용을 텍스트로 추출하기 용이하도록 작성해야 돼.
        프로젝트 결과 보고서에는 다음 항목들이 반드시 포함되었으면 좋겠어.
        만약, 입력된 항목이 보고서를 만들기에 부족하다고 생각되면 너가 임의로 내용을 추가해서 결과 보고서를 완성해줘.
        """

        prompt = ChatPromptTemplate.from_template(template)
        chain = prompt | llm | StrOutputParser()

        stdinReader = await self.get_stdin_reader()
        userInput = await stdinReader.readline()
        userPrompt = {"role": "user", "content": userInput.decode()}
        generatedBacklogText = chain.invoke(input=userPrompt)
        ColorPrinter.print_important_message("5")

        return generatedBacklogText

    # 정규 표현식을 사용하여 '@'로 둘러싸인 제목과 내용을 추출하는 함수
    async def extractSections(self, text):
        # '@제목@' 형식의 제목과 그에 따른 내용을 추출
        sections = re.findall(r'@([^@]+)@\n([\s\S]*?)(?=@|$)', text)

        # 딕셔너리로 저장
        extractedData = {}
        for title, content in sections:
            extractedData[title.strip()] = content.strip()

        return extractedData
